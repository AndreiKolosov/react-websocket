import { type FC, type HTMLProps } from 'react';
import styles from './ConnectionHistory.module.css';
import cn from 'classnames';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { WS_URL } from '../../configs/app.config';
import { isUserEvent } from '../../utils';
import { TWebSocketMessage } from '../../types';

type TConnectionHistoryProps = HTMLProps<HTMLUListElement>;

const ConnectionHistory: FC<TConnectionHistoryProps> = ({ className }) => {
  console.log('history');
  const { lastJsonMessage } = useWebSocket<TWebSocketMessage>(WS_URL, {
    share: true,
    filter: isUserEvent,
  });
  const activities = lastJsonMessage?.data?.userActivity || [];
  return (
    <ul className={cn(styles.history, className)}>
      {activities.map((activity, index) => (
        <li key={`activity-${index}`}>{activity}</li>
      ))}
    </ul>
  );
};

export { ConnectionHistory };
