//@ts-ignore
import { supabase } from '../repositories';
import dayjs from 'dayjs';

type BookResponse = {
  id: number;
  barcode: string;
  title: string;
  writer: string;
  painter: string;
  category: string;
  userId?: number;
  inUse: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Book = {
  id: number;
  barcode: string;
  title: string;
  writer: string;
  painter: string;
  category: string;
  userId?: number;
  inUse: boolean;
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
};

export const DEFAULT_BOOK: Book = {
  id: 0,
  barcode: '',
  title: '',
  writer: '',
  painter: '',
  category: '',
  inUse: true,
  userId: 0,
  createdAt: dayjs(),
  updatedAt: dayjs(),
};

const SCHEMA_NAME = 'BOOK';

type GetBooksParam = { category?: string };

export const getBooks = async ({ category }: GetBooksParam) => {
  const mapResponse = (list: BookResponse[]): Book[] => {
    return list.map((item) => {
      return {
        ...item,
        createdAt: item['createdAt'] ? dayjs(item['createdAt']) : dayjs(),
        updatedAt: item['updatedAt'] ? dayjs(item['updatedAt']) : dayjs(),
      };
    });
  };

  let query = supabase.from(SCHEMA_NAME).select();
  if (!!category) {
    query = query.eq('category', category);
  }

  const { data } = await query
    .order('id', { ascending: false })
    .returns<BookResponse[]>();

  if (!data) {
    return [];
  }
  return mapResponse(data);
};

export const getBookByBarcode = async (
  barcode: string
): Promise<Book | null> => {
  const { data: item } = await supabase
    .from(SCHEMA_NAME)
    .select()
    .eq('barcode', barcode)
    .returns<BookResponse[]>()
    .single();

  if (!item) {
    throw Error('존재하지 않는 책입니다');
  }

  return {
    ...item,
    createdAt: item.createdAt ? dayjs(item.createdAt) : dayjs(),
    updatedAt: item.updatedAt ? dayjs(item.updatedAt) : dayjs(),
  };
};

export async function createBook(book: Book) {
  const { id, userId, ...bookNoId } = book;
  const newBook = {
    ...bookNoId,
    createdAt: book.createdAt.toDate(),
    updatedAt: book.updatedAt.toDate(),
  };
  try {
    await supabase.from(SCHEMA_NAME).insert(newBook).throwOnError();
  } catch (error) {
    //@ts-ignore
    if (error.code === '23505') {
      throw Error('중복된 바코드입니다');
    }
    throw error;
  }
}

export async function updateBook(book: Book) {
  const updateBook = {
    ...book,
    updatedAt: book.updatedAt.toDate(),
  };
  const { error } = await supabase
    .from(SCHEMA_NAME)
    .update(updateBook)
    .eq('id', book.id);
}

export async function updateInUseBook(
  id: number,
  inUse: boolean,
  userId?: number
) {
  const updateBook = {
    inUse,
    userId: userId,
    updatedAt: dayjs().toDate(),
  };
  const { error } = await supabase
    .from(SCHEMA_NAME)
    .update(updateBook)
    .eq('id', id);
}

export async function deleteBook(book: Book) {
  const { error } = await supabase.from(SCHEMA_NAME).delete().eq('id', book.id);
}
