import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Callboard from './pages/Callboard.tsx';
import Contacts from './pages/Contacts.tsx';
import Reports from './pages/Reports.tsx';
import Downloads from './pages/Downloads.tsx';
import Calendar from './pages/Calendar.tsx';
import CreateReport from './pages/CreateReport.tsx';
import Login from './pages/Login.tsx';
import ChangePassword from './pages/ChangePassword.tsx';
import './scss/custom.scss'
import EditUser from './pages/EditUser.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Oops, Something went wrong!</div>,
    children: [
      {
        index: true,
        element: <Callboard />
      }, 
      {
        path: '/contacts', 
        element: <Contacts />
      }, 
      {
        path: '/reports',
        element: <Reports />
      }, 
      {
        path: '/downloads',
        element: <Downloads />
      }, 
      {
        path: '/calendar',
        element: <Calendar />
      },
      {
        path: '/create-report',
        element: <CreateReport />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/change-password',
        element: <ChangePassword />
      },
      {
        path: '/edit-user',
        element: <EditUser />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<RouterProvider router={router} />)
}