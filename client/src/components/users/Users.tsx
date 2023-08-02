import { type FC, type HTMLProps, useState } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { TWebSocketMessage } from '../../types';
import { WS_URL } from '../../configs/app.config';
import { isUserEvent } from '../../utils';
import Avatar from 'react-avatar';
// import styles from './Users.module.css';

type TUsersProps = HTMLProps<HTMLElement>

const Users: FC<TUsersProps> = () => {
  const { lastJsonMessage } = useWebSocket<TWebSocketMessage>(WS_URL, {
    share: true,
    filter: isUserEvent
  });
  const users = Object.values(lastJsonMessage?.data?.users || {});
  const [isVisible, setIsVisible] = useState<boolean>(false)
  return users.map((user, index) => (
    <div key={index}>
      {isVisible && <span>{user.username}</span>}
      <span id={user.username} className="userInfo" key={user.username} onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
        <Avatar name={user.username} size={'40'} round="20px"/>
      </span>
    </div>
  ));
};

export { Users };