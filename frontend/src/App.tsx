import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { loader as allVisitsLoader } from './pages/DashboardPage';

import DashboardPage from './pages/DashboardPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
    errorElement: <div>404 Not Found</div>,
    loader: allVisitsLoader(),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
