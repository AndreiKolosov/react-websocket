import { type FC, type HTMLProps, useState, useEffect } from 'react';
// import { isDocumentEvent } from '../../utils';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { WS_URL } from '../../configs/app.config';
import { TWebSocketMessage } from '../../types';
import { ContentEditableEvent, DefaultEditor } from 'react-simple-wysiwyg';
import styles from './Editor.module.css';
import cn from 'classnames';
import { WS_EVENTS } from '../../utils/constants';

type TEditorProps = HTMLProps<HTMLElement>;

const Editor: FC<TEditorProps> = ({ className }) => {
  const [content, setContent] = useState<string>('');
  const { lastJsonMessage, sendJsonMessage } = useWebSocket<TWebSocketMessage>(WS_URL, {
    share: true,
    // filter: isDocumentEvent
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
