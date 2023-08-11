import { type HTMLProps, type FC } from 'react';
import styles from './Header.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { APP_ROUTS } from '../../router/app-routs';
import { useAuth } from '../../hooks';

type THeaderProps = HTMLProps<HTMLElement>;

const Header: FC<THeaderProps> = ({ className }) => {
  const { isAuth } = useAuth()
  
  return (
    <header className={cn(styles.header, className)}>
      {isAuth && <Link to={APP_ROUTS.QUOTES} className={styles.header__link}>⁎ Quotes ⁎</Link>}
      <Link to={APP_ROUTS.ROOT} className={styles.header__logo}>
        ⫷ Websocket demo ⫸
      </Link>
    </header>
  );
};

export { Header };
