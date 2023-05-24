import UseOrReturn from '@/components/UserOrReturn/UserOrReturn';
import { Book, getBookByBarcode } from '@/services/BookService';
import { returnBook } from '@/services/UserBookService';
import { User } from '@/services/UserService';

export default function UseOrReturnPage() {
  const handleBookBarcode = async (barcode: string): Promise<Book | null> => {
    const book = await getBookByBarcode(barcode);
    if (!book) {
      throw Error('존재하지 않는 바코드입니다');
    }

    if (!book.inUse) {
      throw Error('대여한 적이 없는 책이에요. 먼저 대여해주세요.');
    }

    return book;
  };

  const handleSuccess = async (book: Book, user: User): Promise<void> => {
    if (!book || !user) return;
    await returnBook({ bookId: book.id, userId: user.id });
  };

  return (
    <UseOrReturn
      actionType={'RETURN'}
      handleBookBarcode={handleBookBarcode}
      handleSuccess={handleSuccess}
    />
  );
}
