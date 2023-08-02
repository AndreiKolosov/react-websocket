import { ChangeEvent, useEffect, useState } from 'react';
import {
  UncontrolledTooltip
} from 'reactstrap';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { ContentEditableEvent, DefaultEditor } from 'react-simple-wysiwyg';
import Avatar from 'react-avatar';

import './App.css';

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

function LoginSection({onLogin}: { onLogin: (v: string) => void}) {
  const [username, setUsername] = useState('');
  useWebSocket(WS_URL, {
    share: true,
    filter: () => false
  });
  function logInUser() {
    if(!username.trim()) {
      return;
    }
    onLogin && onLogin(username);
  }

  return (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__profile">
            <p className="account__name">Hello, user!</p>
            <p className="account__sub">Join to edit the document</p>
          </div>
          <input name="username" onInput={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} className="form-control" />
          <button
            type="button"
            onClick={() => logInUser()}
            className="btn btn-primary account__btn">Join</button>
        </div>
      </div>
    </div>
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
  return users.map(user => (
    <div key={user.username}>
      <span id={user.username} className="userInfo" key={user.username}>
        <Avatar name={user.username} size={'40'} round="20px"/>
      </span>
      <UncontrolledTooltip placement="top" target={user.username}>
        {user.username}
      </UncontrolledTooltip>
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
