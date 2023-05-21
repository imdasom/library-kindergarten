import styles from './BookModal.module.scss';
import Modal from '@/components/Modal/Modal';
import { ChangeEvent, useState } from 'react';
import Barcode from 'react-barcode';
import Button from '@/components/Button/Button';
import { Book, DEFAULT_BOOK } from '@/services/BookService';

type Props = {
  actionType: 'NEW' | 'EDIT';
  book?: Book;
  onClose: () => void;
  onSubmit: (book: Book) => void;
};

export default function BookModal({
  actionType,
  book: _user,
  onClose,
  onSubmit,
}: Props) {
  const [book, setBook] = useState<Book>(() => {
    if (_user) return _user;
    return DEFAULT_BOOK;
  });

  const handleSubmit = () => {
    if (book.barcode.length % 2 === 1) {
      alert('바코드숫자의 개수는 짝수이어야 합니다');
      return;
    }

    onSubmit(book);
  };

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    setBook({ ...book, [name]: value });
  };

  return (
    <Modal
      title={actionType === 'EDIT' ? '책 수정' : '책 추가'}
      onClose={onClose}
    >
      <div className={styles.formContainer}>
        {book?.barcode && (
          <div className={styles.formItem}>
            <div>
              <Barcode value={book.barcode} />
            </div>
          </div>
        )}
        <div className={styles.formItem}>
          <label>아이디</label>
          <input value={book?.id === 0 ? '' : book.id} disabled />
        </div>
        <div className={styles.formItem}>
          <label>바코드</label>
          <input
            value={book?.barcode}
            name={'barcode'}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formItem}>
          <label>책이름</label>
          <input value={book?.title} name={'title'} onChange={handleChange} />
        </div>
        <div className={styles.formItem}>
          <label>글쓴이</label>
          <input value={book?.writer} name={'writer'} onChange={handleChange} />
        </div>
        <div className={styles.formItem}>
          <label>그린이</label>
          <input
            value={book?.painter}
            name={'painter'}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formItem}>
          <label style={{ alignSelf: 'start' }}>분류</label>
          <div className={styles.radioGroupWrapper}>
            <div className={styles.radioWrapper}>
              <input
                type={'radio'}
                name={'category'}
                id={'category1'}
                value={'환상그림책'}
                checked={book?.category === '환상그림책'}
                onChange={handleChange}
              />
              <label htmlFor={'category1'}>환상그림책</label>
            </div>
            <div className={styles.radioWrapper}>
              <input
                type={'radio'}
                name={'category'}
                id={'category3'}
                value={'지식그림책'}
                checked={book?.category === '지식그림책'}
                onChange={handleChange}
              />
              <label htmlFor={'category3'}>지식그림책</label>
            </div>
            <div className={styles.radioWrapper}>
              <input
                type={'radio'}
                name={'category'}
                id={'category2'}
                value={'생활동화그림책'}
                checked={book?.category === '생활동화그림책'}
                onChange={handleChange}
              />
              <label htmlFor={'category2'}>생활동화그림책</label>
            </div>
            <div className={styles.radioWrapper}>
              <input
                type={'radio'}
                name={'category'}
                id={'category4'}
                value={'기타그림책'}
                checked={book?.category === '기타그림책'}
                onChange={handleChange}
              />
              <label htmlFor={'category4'}>기타그림책</label>
            </div>
          </div>
        </div>
        {actionType === 'EDIT' && (
          <>
            <div className={styles.formItem}>
              <label>등록일</label>
              <input
                value={book?.createdAt?.format('YYYY-MM-DD HH:mm:ss')}
                disabled
              />
            </div>
            <div className={styles.formItem}>
              <label>수정일</label>
              <input
                value={book?.updatedAt?.format('YYYY-MM-DD HH:mm:ss')}
                disabled
              />
            </div>
          </>
        )}
        <div />
        <Button onClick={handleSubmit} className={styles.submitButton}>
          {actionType === 'EDIT' ? '수정' : '추가'}
        </Button>
      </div>
    </Modal>
  );
}
