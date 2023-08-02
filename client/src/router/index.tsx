import { createBrowserRouter } from 'react-router-dom';
import { APP_ROUTS } from './app-routs';
import { RootLayout } from '../layouts/RootLayout';
import { NotFoundPage } from '../pages/404';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';

const rootRouter = createBrowserRouter(
  [
    {
      path: APP_ROUTS.ROOT,
      element: <RootLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: APP_ROUTS.LOGIN,
          element: <LoginPage />,
        },
        
      ],
    },
  ],
  {
    basename: APP_ROUTS.ROOT,
  },
);

export default rootRouter;