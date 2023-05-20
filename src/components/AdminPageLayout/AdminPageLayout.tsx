import { IoMenuSharp } from 'react-icons/io5';
import { PropsWithChildren } from 'react';
import styles from './AdminPageLayout.module.scss';

export default function AdminPageLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div />
        <div className={styles.titleContainer}>
          <img src={'/logo.png'} width={50} height={50} />
          <div className={styles.title}>{'사랑의 도서관'}</div>
        </div>
        <IoMenuSharp size={30} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
