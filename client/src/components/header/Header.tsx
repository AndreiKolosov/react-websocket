import { type HTMLProps, type FC } from 'react';
import styles from './Header.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { APP_ROUTS } from '../../router/app-routs';

type THeaderProps = HTMLProps<HTMLElement>;

const Header: FC<THeaderProps> = ({ className }) => {
  return (
    <header className={cn(styles.header, className)}>
      <Link to={APP_ROUTS.ROOT} className={styles.header__logo}>
        ⫷ Websocket demo ⫸
      </Link>
    </header>
  );
};

export { Header };
