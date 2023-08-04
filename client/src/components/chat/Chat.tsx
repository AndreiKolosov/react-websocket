import { type FC, type HTMLProps, useState, type FormEvent, useEffect } from 'react';
import styles from './Chat.module.css';
import cn from 'classnames';
import Typography from '../../ui-kit/typography/Typography';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { TChatMessage, TWebSocketMessage } from '../../types';
import { WS_URL } from '../../configs/app.config';
import { WS_EVENTS } from '../../utils/constants';
import { useAppStore } from '../../store/appStore';
import { isUserEvent } from '../../utils';

type TChatProps = HTMLProps<HTMLUListElement>;

const Chat: FC<TChatProps> = ({ className }) => {
  const username = useAppStore(store => store.userName);
  const [message, setMessage] = useState<string>('');
  const [chatData, setChatData] = useState<TChatMessage[]>([])
  const { lastJsonMessage, sendJsonMessage } = useWebSocket<TWebSocketMessage>(WS_URL, {
    share: true,
    filter: isUserEvent
  });

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    sendJsonMessage({
      type: WS_EVENTS.USER_EVENT,
      payload: {
        chatMessage: {from: username, message},
      },
    });
    setMessage('')
  }

  useEffect(() => {
    
    if (lastJsonMessage?.payload.chatData) {
      console.log(lastJsonMessage);
      setChatData(lastJsonMessage.payload.chatData);
    }
  }, [lastJsonMessage]);

  return (
    <div className={cn(styles.chat, className)}>
      <Typography as="p" variant="caption" color="light" className={styles.chat__title}>
        Chat
      </Typography>
      <ul className={cn(styles.chat__list, className)}>
        {chatData && chatData.map((item, index) => (
          <li className={styles.chat__listItem} key={index}>
            <Typography as="p" variant="text-s" color="light" fontWeight="medium" className={cn(styles.chat__message, { [styles.chat__message_self]: true })}>
              {item.message}
            </Typography>
          </li>
        ))}
        
      </ul>
      <form action="submit" className={styles.chat__form} onSubmit={(e) => handleSendMessage(e)}>
        <input type="text" value={message} className={styles.chat__input} onChange={(e) => setMessage(e.target.value)}/>
        <button type="submit" className={styles.chat__formBtn}>
          Send message
        </button>
      </form>
    </div>
  );
};

export { Chat };
