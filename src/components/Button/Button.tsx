import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

type Props = PropsWithChildren<{
  buttonStyle?: 'primary' | 'secondary';
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  buttonStyle = 'primary',
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={[styles.button, styles[buttonStyle]].join(' ')}
    >
      {children}
    </button>
  );
}
