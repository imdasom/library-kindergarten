//@ts-ignore
import { supabase } from '../repositories';
import dayjs from 'dayjs';

export type BookResponse = {
  id: number;
  barcode: string;
  title: string;
  writer: string;
  painter: string;
  publisher: string;
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
  publisher: string;
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
  publisher: '',
  category: '',
  inUse: false,
  userId: 0,
  createdAt: dayjs(),
  updatedAt: dayjs(),
};

const SCHEMA_NAME = 'BOOK';

type GetBooksParam = { category?: string };

export const mapResponse = (item: BookResponse): Book => {
  return {
    ...item,
    createdAt: item['createdAt'] ? dayjs(item['createdAt']) : dayjs(),
    updatedAt: item['updatedAt'] ? dayjs(item['updatedAt']) : dayjs(),
  };
};

export const getBooks = async ({ category }: GetBooksParam) => {
  let query = supabase.from(SCHEMA_NAME).select();

  if (!!category) {
    query = query.eq('category', category);
  }

  const { data } = await query
    .eq('deleted', false)
    .order('id', { ascending: false })
    .returns<BookResponse[]>();

  if (!data) {
    return [];
  }
  return data.map(mapResponse);
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

export const getBookByUserId = async (userId: number): Promise<Book[]> => {
  const { data } = await supabase
    .from(SCHEMA_NAME)
    .select()
    .eq('userId', userId)
    .returns<BookResponse[]>();

  if (!data) {
    return [];
  }

  return data.map(mapResponse);
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
  } catch (error: any) {
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
  console.log(error);
}

export async function updateInUseBook(
  id: number,
  inUse: boolean,
  userId: number | null
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
  console.log(error);
}

export async function deleteBook(book: Book) {
  const updateBook = {
    deleted: true,
    updatedAt: book.updatedAt.toDate(),
  };
  const { error } = await supabase
    .from(SCHEMA_NAME)
    .update(updateBook)
    .eq('id', book.id);
  console.log(error);
}
