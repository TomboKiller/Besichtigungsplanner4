import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { loader as allVisitsLoader } from './pages/Overview';
import { loader as allRentalsLoader } from './pages/DashboardPage';
import { action as createVisitsAction } from './components/visit/Modal';
import { action as createRentalAction } from './components/Sidebar';
// import { action as updateVisitAction } from './components/visit/VisitItem';
import DashboardPage from './pages/DashboardPage';

import { action as updateVisitAction } from './components/visit/VisitItem';
import { action as updateRentalAction } from './components/rental/RentalItem';
import Overview from './pages/Overview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
    loader: allRentalsLoader,
    action: createRentalAction,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        index: true,
        element: <Overview />,
        loader: allVisitsLoader(),
        action: createVisitsAction,
      },
      {
        path: 'visits/:id',
        action: updateVisitAction,
      },
      {
        path: 'rentals/:id',
        action: updateRentalAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
