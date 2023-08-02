import { useState, type FC, type HTMLProps, type ChangeEvent, type FormEvent } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import styles from './LoginSection.module.css';
import { WS_URL } from '../../configs/app.config';
import { useAppStore } from '../../store/appStore';

type TLoginSectionProps = HTMLProps<HTMLElement>;

const LoginSection: FC<TLoginSectionProps> = () => {
  const [username, setUsername] = useState('');
  const setUser = useAppStore((store) => store.setUserName);

  useWebSocket(WS_URL, {
    share: true,
    filter: () => false,
  });

  function logInUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username.trim()) {
      return;
    }
    setUser(username);
  }

  return (
    <section aria-label="Login" className={styles.login}>
        <header className={styles.login__header}>
          <h1 className={styles.login__title}>Привет, пользователь!</h1>
          <p className={styles.login__desc}>Давай знакомиться! <br/> Пожалуйста, введи свое имя или&nbsp;ник в поле ниже.</p>
        </header>

        <form action="submit" onSubmit={(e) => logInUser(e)} className={styles.login__form}>
          <input
            name="username"
            onInput={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            className={styles.login__input}
            placeholder='Пользователь #1'
          />
          <button type="submit" disabled={!username} className={styles.account__btn}>
            Войти в приложение
          </button>
        </form>
    </section>
  );
};

export { LoginSection };
