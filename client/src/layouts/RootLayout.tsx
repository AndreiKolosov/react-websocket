import { type FC, useEffect } from 'react';
import { Outlet, ScrollRestoration, useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { WS_URL } from '../configs/app.config';
import { ReadyState } from 'react-use-websocket';
import { Main } from '../ui-kit/main/Main';
import { Header } from '../components/header/Header';
import { APP_ROUTS } from '../router/app-routs';
import { Footer } from '../components/footer/Footer';
import { useAuth } from '../hooks';

export const RootLayout: FC = () => {
  const { isAuth } = useAuth();
  const userName = useAppStore(store => store.userName);
  const navigate = useNavigate()
  const { pathname } = useLocation();
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
    if (isAuth && readyState === ReadyState.OPEN) {
      console.log(userName);
      
      sendJsonMessage({
        username: userName,
        type: 'userevent',
      });
    }
  }, [userName, sendJsonMessage, readyState, isAuth]);

  useEffect(() => {
    if ((!isAuth && pathname !== APP_ROUTS.LOGIN) || readyState === ReadyState.CLOSED) {
      navigate(APP_ROUTS.LOGIN, { replace: true })
    }
  }, [isAuth, navigate, pathname, readyState])

  return (
    <>
      <Header />
      <Main>
        <Outlet />
        <ScrollRestoration />
      </Main>
      <Footer />
    </>
  );
};