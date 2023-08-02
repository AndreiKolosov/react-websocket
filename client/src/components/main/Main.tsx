import { type FC, type HTMLProps } from 'react';
import styles from './Main.module.css';
type TMainProps = HTMLProps<HTMLElement>

const Main: FC<TMainProps> = ({ children }) => {

  return (
    <main className={styles.main}>
      {children}
    </main>
  );
};

export { Main };