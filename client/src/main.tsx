import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';
import Callboard from './pages/Callboard.tsx';
import Contacts from './pages/Contacts.tsx';
import Reports from './pages/Reports.tsx';
import Downloads from './pages/Downloads.tsx';
import Calendar from './pages/Calendar.tsx';
import Login from './pages/Login.tsx';

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
        element: <Contacts />
      }, {
        path: '/reports',
        element: <Reports />
      }, {
        path: '/downloads',
        element: <Downloads />
      }, {
        path: '/calendar',
        element: <Calendar />
      }, {
        path: '/login',
        element: <Login />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<RouterProvider router={router} />)
}