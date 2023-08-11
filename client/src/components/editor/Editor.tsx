import { type FC, type HTMLProps, useEffect } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { WS_URL } from '../../configs/app.config';
import { TWebSocketMessage } from '../../types';
import { ContentEditableEvent, DefaultEditor } from 'react-simple-wysiwyg';
import styles from './Editor.module.css';
import cn from 'classnames';
import { WS_EVENTS } from '../../utils/constants';
import { useAppStore } from '../../store/appStore';

type TEditorProps = HTMLProps<HTMLElement>;

const Editor: FC<TEditorProps> = ({ className }) => {
  const content = useAppStore((store) => store.editorContent);
  const setContent = useAppStore((store) => store.setEditorContent);
  const { lastJsonMessage, sendJsonMessage } = useWebSocket<TWebSocketMessage>(WS_URL, {
    share: true,
  });

  const handleHtmlChange = (e: ContentEditableEvent) => {
    sendJsonMessage({
      type: WS_EVENTS.CONTENT_CHANGE,
      payload: {
        editorContent: e.target.value,
      },
    });
  }

  useEffect(() => {
    if (lastJsonMessage?.payload.editorContent) {
      setContent(lastJsonMessage.payload.editorContent);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  return (
    <DefaultEditor
      value={content}
      onChange={handleHtmlChange}
      containerProps={{ className: cn(styles.editor, className) }}
    />
  );
};

export { Editor };
