import { PropsWithChildren } from 'react';
import styles from './Modal.module.scss';
import Close from '@/components/icons/Close';

type Props = PropsWithChildren<{
  title?: string;
  onClose?: () => void;
}>;

export default function Modal({ title, onClose, children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.dim}></div>
      <div className={styles.contentWrapper} onClick={onClose}>
        <div
          className={styles.content}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className={styles.header}>
            {title && <div className={styles.title}>{title}</div>}
            <Close onClick={onClose} className={styles.closeButton} />
          </div>
          <div className={styles.children}>{children}</div>
        </div>
      </div>
    </div>
  );
}
