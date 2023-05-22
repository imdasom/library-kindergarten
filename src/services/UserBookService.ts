import { updateInUseBook } from '@/services/BookService';

export async function inUseBook({
  bookId,
  inUse,
  userId,
}: {
  bookId: number;
  inUse: boolean;
  userId: number;
}) {
  updateInUseBook(bookId, inUse, userId).then(() => {
    console.log(`${inUse ? '대출' : '반납'}처리 완료`);
  });
}
