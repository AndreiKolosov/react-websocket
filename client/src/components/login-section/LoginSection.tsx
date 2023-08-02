import { useState, type FC, type HTMLProps, type ChangeEvent } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import styles from './LoginSection.module.css';
import { WS_URL } from '../../configs/app.config';

interface ILoginSectionProps extends HTMLProps<HTMLElement> {
  onLogin: (v: string) => void;
}

const LoginSection: FC<ILoginSectionProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  useWebSocket(WS_URL, {
    share: true,
    filter: () => false,
  });

  function logInUser() {
    if (!username.trim()) {
      return;
    }
    onLogin && onLogin(username);
  }

  return (
    <section aria-label="Login" className={styles.account}>
      <div className={styles.account__wrapper}>
        <div className={styles.account__card}>
          <div className={styles.account__profile}>
            <p className={styles.account__name}>Hello, user!</p>
            <p className={styles.account__sub}>Join to edit the document</p>
          </div>
          <input
            name="username"
            onInput={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            className={styles.account__input}
          />
          <button type="button" onClick={() => logInUser()} className={styles.account__btn}>
            Join
          </button>
        </div>
      </div>
    </section>
  );
};

export { LoginSection };
