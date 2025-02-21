import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { loader as allVisitsLoader } from './pages/Overview';
import { loader as allRentalsLoader } from './pages/DashboardPage';
import { loader as allVisitsRentalLoader } from './pages/SingleRental';
import { action as createVisitsAction } from './components/visit/Modal';
import { action as createRentalAction } from './components/rental/AddingRental';
// import { action as updateVisitAction } from './components/visit/VisitItem';
import DashboardPage from './pages/DashboardPage';

import { action as updateVisitAction } from './components/visit/VisitItem';
import { action as updateRentalAction } from './components/rental/RentalItem';
import Overview from './pages/Overview';
import SingleRental from './pages/SingleRental';

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
      },
      {
        path: 'rental/:id',
        element: <SingleRental />,
        loader: allVisitsRentalLoader,
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
