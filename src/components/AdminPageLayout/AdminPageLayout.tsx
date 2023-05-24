import { IoMenuSharp } from 'react-icons/io5';
import { PropsWithChildren } from 'react';
import styles from './AdminPageLayout.module.scss';
import Modal from '@/components/Modal/Modal';
import Menu from '@/components/Menu/Menu';
import useModal from '@/components/Modal/useModal';

export default function AdminPageLayout({ children }: PropsWithChildren) {
  const sideMenu = useModal();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div />
        <div className={styles.titleContainer}>
          <img src={'/logo.png'} width={50} height={50} />
          <div className={styles.title}>{'사랑의 도서관'}</div>
        </div>
        <IoMenuSharp
          size={30}
          onClick={() => sideMenu.onOpen()}
          className={styles.menuButton}
        />
      </div>
      <div className={styles.content}>{children}</div>
      {sideMenu.open && (
        <Modal onClose={sideMenu.onClose}>
          <Menu />
        </Modal>
      )}
    </div>
  );
}
