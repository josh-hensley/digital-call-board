import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import Callboard from './pages/Callboard';
import Contacts from './pages/Contacts';
import Reports from './pages/Reports';
import Downloads from './pages/Downloads';
import Calendar from './pages/Calendar';
import CreateReport from './pages/CreateReport';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import Videos from './pages/Videos'
import './scss/custom.scss'
import EditUser from './pages/EditUser';
import AddUser from './pages/AddUser';


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
      },
      {
        path: '/add-user',
        element: <AddUser />
      },
      {
        path: '/videos',
        element: <Videos />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<RouterProvider router={router} />)
}