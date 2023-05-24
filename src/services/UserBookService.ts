import { updateInUseBook } from '@/services/BookService';
import {
  createHistory,
  getHistories,
  getLatestHistory,
  updateHistory,
} from '@/services/HistoryService';
import dayjs from 'dayjs';

export async function inUseBook({
  bookId,
  userId,
}: {
  bookId: number;
  userId: number;
}) {
  updateInUseBook(bookId, true, userId)
    .then(() => {
      return createHistory({
        userId,
        bookId,
      });
    })
    .then(() => {
      console.log(`대출 완료`);
    });
}

export async function returnBook({
  bookId,
  userId,
}: {
  bookId: number;
  userId: number;
}) {
  updateInUseBook(bookId, false, userId)
    .catch((error) => alert(error.message))
    .then(() => {
      console.log('success updateInUseBook', bookId, userId);
      return getLatestHistory(bookId, userId);
    })
    .then((history) => {
      console.log('success getLatestHistory', history);
      return updateHistory({
        id: history.id,
        returnAt: dayjs(),
      });
    })
    .catch((error) => alert(error.message))
    .then(() => {
      console.log(`대출 완료`);
    });
}

export async function shouldReturnBook({
  historyId,
  bookId,
  userId,
}: {
  historyId: number;
  bookId: number;
  userId: number;
}) {
  updateInUseBook(bookId, false, userId)
    .catch((error) => alert(error.message))
    .then((history) => {
      console.log('success getLatestHistory', history);
      return updateHistory({
        id: historyId,
        returnAt: dayjs(),
      });
    })
    .catch((error) => alert(error.message))
    .then(() => {
      console.log(`반납처리완료`);
      window.location.reload();
    });
}
