import { type FC, type HTMLProps } from 'react';
// import { isDocumentEvent } from '../../utils';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { WS_URL } from '../../configs/app.config';
import { TWebSocketMessage } from '../../types';
import { ContentEditableEvent, DefaultEditor } from 'react-simple-wysiwyg';
// import styles from './Editor.module.css';

type TEditorProps = HTMLProps<HTMLElement>

const Editor: FC<TEditorProps> = () => {
  const { lastJsonMessage, sendJsonMessage } = useWebSocket<TWebSocketMessage>(WS_URL, {
    share: true,
    // filter: isDocumentEvent
  });

  const html =  lastJsonMessage?.data?.editorContent || '';

  function handleHtmlChange(e: ContentEditableEvent) {
    sendJsonMessage({
      type: 'contentchange',
      content: e.target.value
    });
  }

  return (
    <DefaultEditor value={html} onChange={handleHtmlChange} />
  );
};

export { Editor };