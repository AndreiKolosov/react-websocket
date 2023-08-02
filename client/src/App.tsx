import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { LoginSection } from './components/login-section/LoginSection';
import { WS_URL } from './configs/app.config';
import { EditorSection } from './components/editor-section/EditorSection';
import './styles/globals.css';

function App() {
  const [username, setUsername] = useState('');
  const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (username && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        username,
        type: 'userevent',
      });
    }
  }, [username, sendJsonMessage, readyState]);

  return (
    <>
      <header>
        <h1>Real-time document editor</h1>
      </header>
      <main className="container-fluid">{username ? <EditorSection /> : <LoginSection onLogin={setUsername} />}</main>
    </>
  );
}

export default App;
