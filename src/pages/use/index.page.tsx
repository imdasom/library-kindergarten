import UseOrReturn from '@/components/UserOrReturn/UserOrReturn';
import { Book, getBookByBarcode } from '@/services/BookService';
import { inUseBook } from '@/services/UserBookService';
import { User } from '@/services/UserService';

export default function UseOrReturnPage() {
  const handleBookBarcode = async (barcode: string): Promise<Book | null> => {
    const book = await getBookByBarcode(barcode);
    if (!book) {
      throw Error('존재하지 않는 바코드입니다');
    }
    if (book.inUse) {
      throw Error('이미 대출중인 책입니다');
    }
    return book;
  };

  const handleSuccess = async (book: Book, user: User): Promise<void> => {
    if (!book || !user) return;
    await inUseBook({ bookId: book.id, userId: user.id });
  };

  return (
    <UseOrReturn
      actionType={'USE'}
      handleBookBarcode={handleBookBarcode}
      handleSuccess={handleSuccess}
    />
  );
}
