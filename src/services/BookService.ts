//@ts-ignore
import { supabase } from '../repositories';
import dayjs from 'dayjs';

type BookResponse = {
  id: number;
  barcode: string;
  title: string;
  author: string;
  in_use: boolean;
  created_at: Date;
  updated_at: Date;
};

export type Book = {
  id: number;
  barcode: string;
  title: string;
  author: string;
  inUse: boolean;
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
};

const SCHEMA_NAME = 'BOOK';

export const getBooks = async () => {
  const mapResponse = (list: BookResponse[]): Book[] => {
    return list.map((item) => {
      return {
        id: Number(item['id']),
        barcode: item['barcode'],
        title: item['title'],
        author: item['author'],
        inUse: item['in_use'],
        createdAt: item['created_at'] ? dayjs(item['created_at']) : dayjs(),
        updatedAt: item['updated_at'] ? dayjs(item['updated_at']) : dayjs(),
      };
    });
  };
  const { data } = await supabase
    .from(SCHEMA_NAME)
    .select()
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
    id: item.id,
    barcode: item.barcode,
    title: item.title,
    author: item.author,
    inUse: item.in_use,
    createdAt: item.created_at ? dayjs(item.created_at) : dayjs(),
    updatedAt: item.updated_at ? dayjs(item.updated_at) : dayjs(),
  };
};

export async function createBook(book: Book) {
  const newBook = {
    barcode: book.barcode,
    title: book.title,
    author: book.author,
    inUse: book.inUse,
    created_at: book.createdAt.toDate(),
    updated_at: book.updatedAt.toDate(),
  };
  await supabase.from(SCHEMA_NAME).insert(newBook);
}

export async function updateBook(book: Book) {
  const updateBook = {
    id: book.id,
    barcode: book.barcode,
    title: book.title,
    author: book.author,
    inUse: book.inUse,
    created_at: book.createdAt.toDate(),
    updated_at: book.updatedAt.toDate(),
  };
  const { error } = await supabase
    .from(SCHEMA_NAME)
    .update(updateBook)
    .eq('id', book.id);
}
