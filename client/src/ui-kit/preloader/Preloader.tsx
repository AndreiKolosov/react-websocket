import { FC } from 'react';
import styles from './Preloader.module.css';
import cn from 'classnames'

const Preloader: FC<{className?: string}> = ({ className }) => {
  return <div className={cn(styles.preloader, className)}>Загрузка...</div>;
};

export default Preloader;
