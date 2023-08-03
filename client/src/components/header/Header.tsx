import { type HTMLProps, type FC, useState } from 'react';
import styles from './Header.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { APP_ROUTS } from '../../router/app-routs';

type THeaderProps = HTMLProps<HTMLElement>;

const Header: FC<THeaderProps> = ({ className }) => {
  const [hello, setHello] = useState<string>('')

  const getHello = async () => {
    const data = await fetch('http://localhost:4000/api/hello').then(res => res.json())
    setHello(data.hello)
  }

  return (
    <header className={cn(styles.header, className)}>
      <Link to={APP_ROUTS.ROOT} className={styles.header__logo}>
        ⫷ Websocket demo ⫸
      </Link>
      <button type='button' onClick={getHello}>{hello ? hello : 'Get hello from API'}</button>
    </header>
  );
};

export { Header };
