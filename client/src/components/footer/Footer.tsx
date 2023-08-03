import { type HTMLProps, type FC } from 'react';
import styles from './Footer.module.css';
import cn from 'classnames';

type TFooterProps = HTMLProps<HTMLElement>;

const Footer: FC<TFooterProps> = ({ className }) => {
  return (
    <footer className={cn(styles.footer, className)}>
      <span className={styles.footer__copy}>&copy; Rusty Void</span>
    </footer>
  );
};

export { Footer };
