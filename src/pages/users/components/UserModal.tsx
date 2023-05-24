import { DEFAULT_USER, User } from '@/services/UserService';
import styles from './UserModal.module.scss';
import Modal from '@/components/Modal/Modal';
import { ChangeEvent, useEffect, useState } from 'react';
import Barcode from 'react-barcode';
import Button from '@/components/Button/Button';
import { downloadSvgToJpeg } from '../../../helper';
import { Book, getBookByUserId } from '@/services/BookService';
import dayjs from 'dayjs';

type Props = {
  actionType: 'NEW' | 'EDIT';
  user?: User;
  onClose: () => void;
  onSubmit: (user: User) => void;
};

export default function UserModal({
  actionType,
  user: _user,
  onClose,
  onSubmit,
}: Props) {
  const [user, setUser] = useState<User>(() => {
    if (_user) return _user;
    return DEFAULT_USER;
  });

  const [books, setBooks] = useState<Book[]>();
  useEffect(() => {
    if (!_user) return;
    getBookByUserId(user.id).then(setBooks);
  }, [_user]);

  const handleSubmit = () => {
    onSubmit(user);
  };

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    setUser({ ...user, [name]: value });
  };

  const handleClickBarcode = async (barcode: string) => {
    const $captureBlock = document.getElementById(`barcode-image-${barcode}`);
    await downloadSvgToJpeg($captureBlock, `book-barcode-${barcode}.jpeg`);
  };

  return (
    <Modal
      title={actionType === 'EDIT' ? '회원 수정' : '회원 추가'}
      onClose={onClose}
    >
      <div className={styles.formContainer}>
        {user?.barcode && (
          <div className={styles.formItem}>
            <div
              id={`barcode-image-${user.barcode}`}
              className={styles.barcodeImageCaptureBlock}
              onClick={async (event) => {
                event.stopPropagation();
                await handleClickBarcode(user.barcode);
              }}
            >
              <Barcode value={user.barcode} />
            </div>
          </div>
        )}
        <div className={styles.formItem}>
          <label style={{ alignSelf: 'self-start' }}>대여중인 책</label>
          <textarea
            value={
              books
                ? books
                    .map(
                      (book) =>
                        `[${dayjs(book.createdAt).format('YYYY.MM.DD')}] ${
                          book.title
                        }`
                    )
                    .join('\n')
                : ''
            }
            disabled
          />
        </div>
        <div className={styles.formItem}>
          <label>아이디</label>
          <input value={user?.id === 0 ? '' : user.id} disabled />
        </div>
        <div className={styles.formItem}>
          <label>바코드</label>
          <input
            value={user?.barcode}
            name={'barcode'}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formItem}>
          <label>이름</label>
          <input value={user?.name} name={'name'} onChange={handleChange} />
        </div>
        <div className={styles.formItem}>
          <label>권한</label>
          <input
            type={'radio'}
            name={'role'}
            id={'roleUser'}
            value={'USER'}
            checked={user?.role === 'USER'}
            onChange={handleChange}
          />
          <label htmlFor={'roleUser'}>일반</label>
          <input
            type={'radio'}
            name={'role'}
            id={'roleAdmin'}
            value={'ADMIN'}
            checked={user?.role === 'ADMIN'}
            onChange={handleChange}
          />
          <label htmlFor={'roleAdmin'}>관리자</label>
        </div>
        {actionType === 'EDIT' && (
          <>
            <div className={styles.formItem}>
              <label>등록일</label>
              <input
                value={user?.createdAt?.format('YYYY-MM-DD HH:mm:ss')}
                disabled
              />
            </div>
            <div className={styles.formItem}>
              <label>수정일</label>
              <input
                value={user?.updatedAt?.format('YYYY-MM-DD HH:mm:ss')}
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
