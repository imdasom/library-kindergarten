//@ts-ignore
import { supabase } from '../repositories';
import dayjs from 'dayjs';
import {
  mapResponse as mapBookResponse,
  Book,
  BookResponse,
  DEFAULT_BOOK,
} from '@/services/BookService';
import {
  mapResponse as mapUserResponse,
  DEFAULT_USER,
  User,
  UserResponse,
} from '@/services/UserService';

type HistoryResponse = {
  id: number;
  createdAt: Date;
  returnAt: Date;
  dueAt: Date;
  userId: UserResponse;
  bookId: BookResponse;
};

export type History = {
  id: number;
  createdAt: dayjs.Dayjs;
  returnAt: dayjs.Dayjs | null;
  dueAt: dayjs.Dayjs;
  user: User;
  book: Book;
};

export type UpdateHistory = {
  id: number;
  returnAt: dayjs.Dayjs | null;
  user?: User | null;
  book?: Book | null;
};

export const DEFAULT_HISTORY: History = {
  id: 0,
  user: DEFAULT_USER,
  book: DEFAULT_BOOK,
  createdAt: dayjs(),
  returnAt: null,
  dueAt: dayjs(),
};

const SCHEMA_NAME = 'HISTORY';

const mapResponse = (list: HistoryResponse[]): History[] => {
  return list.map((item) => {
    const { userId, bookId, ..._item } = item;
    return {
      ..._item,
      user: mapUserResponse(userId),
      book: mapBookResponse(bookId),
      createdAt: item['createdAt'] ? dayjs(item['createdAt']) : dayjs(),
      returnAt: item['returnAt'] ? dayjs(item['returnAt']) : null,
      dueAt: item['dueAt'] ? dayjs(item['dueAt']) : dayjs(),
    };
  });
};

export const getHistories = async () => {
  const query = supabase.from(SCHEMA_NAME).select(`*, userId(*), bookId(*)`);

  const { data } = await query
    .order('id', { ascending: false })
    .returns<HistoryResponse[]>();

  if (!data) {
    return [];
  }
  return mapResponse(data);
};

export async function createHistory(history: {
  userId: number;
  bookId: number;
}) {
  const newHistory = {
    ...history,
    createdAt: dayjs().toDate(),
    dueAt: dayjs().add(7, 'day').endOf('day').toDate(),
  };

  try {
    await supabase.from(SCHEMA_NAME).insert(newHistory).throwOnError();
  } catch (error) {
    throw error;
  }
}

export async function updateHistory(updateHistory: UpdateHistory) {
  await supabase.from(SCHEMA_NAME).update(updateHistory).eq('id', history.id);
}

export async function getLatestHistory(
  bookId: number,
  userId: number
): Promise<History> {
  const { data, error } = await supabase
    .from(SCHEMA_NAME)
    .select(`*, userId(*), bookId(*)`)
    .eq('userId.id', userId)
    .eq('bookId.id', bookId)
    .order('id', { ascending: false })
    .returns<HistoryResponse[]>();
  if (error) throw Error(error.message);
  if (!data) throw Error('대출/반납 이력을 찾을 수 없어요');
  const target = data[0];
  if (target.bookId != bookId || target.userId != userId)
    throw Error('대출/반납 이력을 찾을 수 없어요');
  return target;
}
