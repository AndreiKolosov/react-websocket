import { type FC, type HTMLProps } from 'react';
// import { isDocumentEvent } from '../../utils';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { WS_URL } from '../../configs/app.config';
import { TWebSocketMessage } from '../../types';
import { ContentEditableEvent, DefaultEditor } from 'react-simple-wysiwyg';
import styles from './Editor.module.css';
import cn from 'classnames';
import { WS_EVENTS } from '../../utils/constants';

type TEditorProps = HTMLProps<HTMLElement>

const Editor: FC<TEditorProps> = ({ className }) => {
  const { lastJsonMessage, sendJsonMessage } = useWebSocket<TWebSocketMessage>(WS_URL, {
    share: true,
    // filter: isDocumentEvent
  });

  const html =  lastJsonMessage?.data?.editorContent || '';

  function handleHtmlChange(e: ContentEditableEvent) {
    sendJsonMessage({
      type: WS_EVENTS.CONTENT_CHANGE,
      data: {
        editorContent:  e.target.value
      }
    });
  }

  return (
    <DefaultEditor value={html} onChange={handleHtmlChange} containerProps={{className: cn(styles.editor, className)}}  />
  );
};

export { Editor };

