import { useEffect, useState } from 'react';
import {
  createBook,
  getBooks,
  updateBook,
  Book,
  deleteBook,
  getBooksByCategory,
} from '@/services/BookService';
import AdminPageLayout from '@/components/AdminPageLayout/AdminPageLayout';
import styles from './index.module.scss';
import BookModal from '@/pages/books/components/BookModal';
import useModal from '@/components/Modal/useModal';
import Button from '@/components/Button/Button';

export default function BookListPage() {
  const [bookList, setBookList] = useState<Book[]>();
  const createModal = useModal();
  const updateModal = useModal();
  const [modalBook, setModalBook] = useState<Book>();

  const handleGetBookList = () => {
    getBooks({}).then((response) => {
      if (!response) return;
      setBookList(response);
    });
  };

  useEffect(() => {
    handleGetBookList();
  }, []);

  const openUpdateModal = (book: Book) => {
    updateModal.onOpen();
    setModalBook(book);
  };

  const handleSubmitCreate = (book: Book) => {
    createBook(book)
      .then(() => {
        alert('등록되었습니다');
        createModal.onClose();
        setModalBook(undefined);
        return handleGetBookList();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSubmitUpdate = (book: Book) => {
    updateBook(book)
      .then(() => {
        alert('수정되었습니다');
        updateModal.onClose();
        setModalBook(undefined);
        return handleGetBookList();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDelete = (book: Book) => {
    deleteBook(book)
      .then(() => {
        alert('삭제되었습니다');
        return handleGetBookList();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleClickCategory = (category: string) => {
    getBooks({ category })
      .then((response) => {
        if (!response) return;
        setBookList(response);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <AdminPageLayout>
      <div className={styles.container}>
        <div className={styles.actionButtons}>
          <div className={styles.leftActionItems}>
            <div>
              총 <strong>{bookList?.length || 0}</strong>개
            </div>
            <div className={styles.categoryList}>
              <div onClick={() => handleClickCategory('환상그림책')}>
                환상그림책
              </div>
              <div onClick={() => handleClickCategory('지식그림책')}>
                지식그림책
              </div>
              <div onClick={() => handleClickCategory('생활동화그림책')}>
                생활동화그림책
              </div>
              <div onClick={() => handleClickCategory('기타그림책')}>
                기타그림책
              </div>
            </div>
          </div>
          <Button onClick={createModal.onOpen}>추가</Button>
        </div>
        <div className={styles.listContainer}>
          <div className={styles.itemContainer}>
            <div>아이디</div>
            <div>바코드</div>
            <div>분류</div>
            <div>책이름</div>
            <div>수정일</div>
            <div></div>
          </div>
          {bookList?.map((book, i) => {
            return (
              <div
                key={i}
                className={styles.itemContainer}
                onClick={() => openUpdateModal(book)}
              >
                <div>{book.id}</div>
                <div>{book.barcode}</div>
                <div>{book.category}</div>
                <div>
                  {book.title}
                  <br />
                  <span
                    className={styles.writerPainter}
                  >{`${book.writer} / ${book.painter}`}</span>
                </div>
                <div>{book.updatedAt.format('YYYY-MM-DD')}</div>
                <div>
                  <Button
                    buttonStyle={'danger'}
                    buttonSize={'S'}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(book);
                    }}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {createModal.open && (
        <BookModal
          actionType={'NEW'}
          onClose={() => {
            createModal.onClose();
            setModalBook(undefined);
          }}
          onSubmit={handleSubmitCreate}
          book={modalBook}
        />
      )}
      {updateModal.open && (
        <BookModal
          actionType={'EDIT'}
          onClose={() => {
            updateModal.onClose();
            setModalBook(undefined);
          }}
          onSubmit={handleSubmitUpdate}
          book={modalBook}
        />
      )}
    </AdminPageLayout>
  );
}
