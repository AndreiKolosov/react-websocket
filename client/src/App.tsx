import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { ContentEditableEvent, DefaultEditor } from 'react-simple-wysiwyg';
import Avatar from 'react-avatar';

import './App.css';
import { LoginSection } from './components/login-section/LoginSection';

const WS_URL = 'ws://127.0.0.1:4000';
type TJson = {type: string, data?: {users?: {[key: string]: {username: string, type: string}}, editorContent?: string, userActivity: string[] }}
function isUserEvent(message: {type: string, data: string}) {
    const evt = JSON.parse(message.data);
    return evt.type === 'userevent';
}

function isDocumentEvent(message: {type: string, data: string}) {
  const evt = JSON.parse(message.data);
  return evt.type === 'contentchange';
}

function App() {
  const [username, setUsername] = useState('');
  const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true
  });

  useEffect(() => {
    if(username && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        username,
        type: 'userevent'
      });
    }
  }, [username, sendJsonMessage, readyState]);

  return (
    <>
      <h1>Real-time document editor</h1>
      <div className="container-fluid">
        {username ? <EditorSection/>
            : <LoginSection onLogin={setUsername}/> }
      </div>
    </>
  );
}

function History() {
  console.log('history');
  const { lastJsonMessage } = useWebSocket<TJson>(WS_URL, {
    share: true,
    filter: isUserEvent
  });
  const activities = lastJsonMessage?.data?.userActivity || [];
  return (
    <ul>
      {activities.map((activity, index) => <li key={`activity-${index}`}>{activity}</li>)}
    </ul>
  );
}

function Users() {
  const { lastJsonMessage } = useWebSocket<TJson>(WS_URL, {
    share: true,
    filter: isUserEvent
  });
  const users = Object.values(lastJsonMessage?.data?.users || {});
  const [isVisible, setIsVisible] = useState<boolean>(false)
  return users.map(user => (
    <div key={user.username}>
      {isVisible && <span>{user.username}</span>}
      <span id={user.username} className="userInfo" key={user.username} onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
        <Avatar name={user.username} size={'40'} round="20px"/>
      </span>
    </div>
  ));
}

function EditorSection() {
  return (
    <div className="main-content">
      <div className="document-holder">
        <div className="currentusers">
          <Users/>
        </div>
        <Document/>
      </div>
      <div className="history-holder">
        <History/>
      </div>
    </div>
  );
}

function Document() {
  const { lastJsonMessage, sendJsonMessage } = useWebSocket<TJson>(WS_URL, {
    share: true,
    filter: isDocumentEvent
  });

  const html =  lastJsonMessage?.data?.editorContent || '';

  function handleHtmlChange(e: ContentEditableEvent) {
    console.log(e);
    
    sendJsonMessage({
      type: 'contentchange',
      content: e.target.value
    });
  }

  return (
    <DefaultEditor value={html} onChange={handleHtmlChange} />
  );
}

export default App;

