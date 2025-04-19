import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';
import Callboard from './pages/Callboard.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Oops, Something went wrong!</div>,
    children: [
      {
        index: true,
        element: <Callboard />
      }, {
        path: '/contacts', 
        element: <div>Contacts</div>
      }, {
        path: '/reports',
        element: <div>Reports</div>
      }, {
        path: '/downloads',
        element: <div>Downloads</div>
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<RouterProvider router={router} />)
}