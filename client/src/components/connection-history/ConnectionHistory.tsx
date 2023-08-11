import { useState, type FC, type HTMLProps, useEffect, useRef } from 'react';
import styles from './ConnectionHistory.module.css';
import cn from 'classnames';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { WS_URL } from '../../configs/app.config';
import { isUserEvent } from '../../utils';
import { TWebSocketMessage } from '../../types';
import Typography from '../../ui-kit/typography/Typography';
import { useAppStore } from '../../store/appStore';

type TConnectionHistoryProps = HTMLProps<HTMLUListElement>;

const ConnectionHistory: FC<TConnectionHistoryProps> = ({ className }) => {
  const activities = useAppStore(store => store.activityHistory);
  const setActivities = useAppStore(store => store.setActivityHistory);

  const [prevScrollHeight, setPrevScrollHeight] = useState<number>(0);
  const listRef = useRef<HTMLUListElement>(null);
  const { lastJsonMessage } = useWebSocket<TWebSocketMessage>(WS_URL, {
    share: true,
    filter: isUserEvent,
  });

  useEffect(() => {
    if(lastJsonMessage?.payload.usersActivity) {
      setActivities(lastJsonMessage?.payload.usersActivity)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage])

  useEffect(() => {
    const list = listRef.current;
    if(list) {
      const height = list.scrollHeight
      list.scrollTo({top: height, behavior: height - prevScrollHeight < 100 ? 'smooth' : 'instant'});
      setPrevScrollHeight(height)
      
    }
  }, [listRef, activities, prevScrollHeight])

  return (
    <ul ref={listRef} className={cn(styles.history, className)}>
      {activities.map((activity, index) => (
        <li key={`activity-${index}`}>
          <Typography title={activity} as="p" variant="text-l" color="light" fontWeight='medium' className={styles.history__item}>
            {activity}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

export { ConnectionHistory };
