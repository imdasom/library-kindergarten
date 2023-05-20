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
      <div className={styles.dim} onClick={onClose}></div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            {title && <div className={styles.title}>{title}</div>}
            <Close onClick={onClose} />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
