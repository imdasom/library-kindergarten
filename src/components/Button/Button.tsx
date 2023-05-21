import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

type Props = PropsWithChildren<{
  buttonStyle?: 'primary' | 'secondary' | 'danger';
  buttonSize?: 'S' | 'M';
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  buttonStyle = 'primary',
  buttonSize = 'M',
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={[
        styles.button,
        styles[buttonStyle],
        styles[buttonSize],
        props.className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
