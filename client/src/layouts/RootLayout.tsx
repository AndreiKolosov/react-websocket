import { type FC, useEffect } from 'react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { WS_URL } from '../configs/app.config';
import { ReadyState } from 'react-use-websocket';
import { Main } from '../components/main/Main';

export const RootLayout: FC = () => {
  const userName = useAppStore(store => store.userName);
  const navigate = useNavigate()
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
    if (userName && readyState === ReadyState.OPEN) {
      console.log(userName);
      
      sendJsonMessage({
        username: userName,
        type: 'userevent',
      });
    }
  }, [userName, sendJsonMessage, readyState]);

  useEffect(() => {
    if (!userName) {
      navigate('/login')
    }
  }, [userName, navigate])

  return (
    <>
      <header>
        <p>Header</p>
      </header>
      <Main>
        <Outlet />
        <ScrollRestoration />
      </Main>
      <footer><span>&copy; A.Kolosov</span></footer>
    </>
  );
};