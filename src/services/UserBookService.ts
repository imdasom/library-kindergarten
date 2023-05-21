import { updateInUseBook } from '@/services/BookService';

export async function inUseBook({ bookId, inUse }) {
  updateInUseBook(bookId, inUse).then(() => {});
}
