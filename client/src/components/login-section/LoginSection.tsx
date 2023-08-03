import { useState, type FC, type HTMLProps, type ChangeEvent, type FormEvent } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import styles from './LoginSection.module.css';
import { WS_URL } from '../../configs/app.config';
import { useAppStore } from '../../store/appStore';
import Button from '../../ui-kit/button/Button';
import Typography from '../../ui-kit/typography/Typography';

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
          <Typography as='h1' variant='h1' color='dark'>Hello, user!</Typography>
          <Typography as='p' variant='h2' color='dark' fontWeight='medium'>Let's get acquainted! <br/> Please enter your name or nickname in the field below.</Typography>
        </header>

        <form action="submit" onSubmit={(e) => logInUser(e)} className={styles.login__form}>
          <input
            name="username"
            onInput={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            className={styles.login__input}
            placeholder='# Your name'
          />

          <Button variant='fill' color={!username ? 'dark' : 'accent'} fullWidth htmlType="submit" title='Continue' disabled={!username} className={styles.account__btn}>
            Continue
          </Button>

        </form>
    </section>
  );
};

export { LoginSection };
