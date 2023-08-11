import { type FC, type HTMLProps, useState, useEffect } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { TWebSocketMessage } from '../../types';
import { WS_URL } from '../../configs/app.config';
import { isUserEvent } from '../../utils';
import Avatar from 'react-avatar';
import Typography from '../../ui-kit/typography/Typography';
import styles from './Users.module.css';
import cn from 'classnames';
import { useAppStore } from '../../store/appStore';

type TUsersProps = HTMLProps<HTMLElement>;

type TUser = { username: string; id: string };

const UserPreview = ({ userData }: { userData: TUser }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {isVisible && (
        <Typography as="span" variant="caption" color="dark" className={styles.users__name}>
          {userData.username}
        </Typography>
      )}
      <Avatar name={userData.username} size={'40'} round="20px" />
    </div>
  );
};

const Users: FC<TUsersProps> = ({ className }) => {
  const { lastJsonMessage } = useWebSocket<TWebSocketMessage>(WS_URL, {
    share: true,
    filter: isUserEvent,
  });
  const activeUsers = useAppStore(store => store.activeUsers);
  const setActiveUsers = useAppStore(store => store.setActiveUsers);

  useEffect(() => {
    if (lastJsonMessage?.payload.users) {
      setActiveUsers(Object.values(lastJsonMessage.payload.users));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  return (
    <ul className={cn(styles.users, className)}>
      {activeUsers.map((user) => (
        <li key={user.id}>
          <UserPreview userData={user} />
        </li>
      ))}
    </ul>
  );
};

export { Users };
