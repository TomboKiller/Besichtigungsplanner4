import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { loader as allVisitsLoader } from './pages/DashboardPage';
import { action as createVisitsAction } from './components/hyper/Modal';
// import { action as updateVisitAction } from './components/visit/VisitItem';
import DashboardPage from './pages/DashboardPage';

import { action as updateVisitAction } from './components/visit/VisitItem';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
    errorElement: <div>404 Not Found</div>,
    loader: allVisitsLoader(),
    action: createVisitsAction,
    children: [
      {
        path: 'visits/:id',
        action: updateVisitAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
