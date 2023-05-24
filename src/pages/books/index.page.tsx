import { useEffect, useState } from 'react';
import {
  createBook,
  getBooks,
  updateBook,
  Book,
  deleteBook,
} from '@/services/BookService';
import AdminPageLayout from '@/components/AdminPageLayout/AdminPageLayout';
import styles from './index.module.scss';
import BookModal from '@/pages/books/components/BookModal';
import useModal from '@/components/Modal/useModal';
import Button from '@/components/Button/Button';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import { downloadSvgToJpeg } from '../../helper';

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

  const handleClickBarcode = async (barcode: string) => {
    const $captureBlock = document.getElementById(`barcode-image-${barcode}`);
    await downloadSvgToJpeg($captureBlock, `book-barcode-${barcode}.jpeg`);
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
            <div className={styles.listDescription}>
              바코드 이미지를 클릭하면 다운로드 되어요
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
            <div>대여상태</div>
            <div>수정일</div>
            <div></div>
          </div>
          {bookList?.map((book, i) => {
            return (
              <div key={i} className={styles.itemContainer}>
                <div>{book.id}</div>
                <div
                  className={styles.barcodeImageCaptureBlock}
                  onClick={async (event) => {
                    event.stopPropagation();
                    await handleClickBarcode(book.barcode);
                  }}
                >
                  <div
                    id={`barcode-image-${book.barcode}`}
                    className={styles.pointer}
                  >
                    <Barcode value={book.barcode} height={50} />
                  </div>
                </div>
                <div>{book.category}</div>
                <div
                  onClick={() => openUpdateModal(book)}
                  className={styles.pointer}
                >
                  <span style={{ textDecoration: 'underline' }}>
                    {book.title}
                  </span>
                  <br />
                  <span
                    className={styles.writerPainter}
                  >{`${book.writer} / ${book.painter}`}</span>
                </div>
                <div>{book.inUse ? '대여중' : ''}</div>
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
