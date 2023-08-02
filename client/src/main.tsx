import { createRoot } from 'react-dom/client';
import { root } from './utils/selectors.ts';
import './styles/globals.css';
import { RouterProvider } from 'react-router-dom';
import rootRouter from './router/index.tsx';

createRoot(root).render(<RouterProvider router={rootRouter} />);
