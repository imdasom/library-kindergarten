import styles from '@/components/Menu/Menu.module.scss';
import { CSSProperties } from 'react';

export default function Menu() {
  return (
    <div style={MenuContainer}>
      <a className={styles.menu} href={'/'}>
        대출/반납하기
      </a>
      <a className={styles.menu} href={'/history'}>
        대출/반납 이력관리
      </a>
      <a className={styles.menu} href={'/books'}>
        책 관리
      </a>
      <a className={styles.menu} href={'/users'}>
        회원 관리
      </a>
    </div>
  );
}

const MenuContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '300px',
  justifyContent: 'center',
  alignItems: 'center',
} as CSSProperties;
