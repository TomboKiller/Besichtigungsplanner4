import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { loader as allVisitsLoader } from './pages/Overview';
import { loader as allRentalsLoader } from './pages/DashboardPage';
import { loader as allVisitsRentalLoader } from './pages/SingleRental';
import { action as createVisitsAction } from './components/visit/Modal';
import { action as createRentalAction } from './components/rental/AddingRental';
// import { action as updateVisitAction } from './components/visit/VisitItem';
import DashboardPage from './pages/DashboardPage';
import Login from './pages/Login'; // Import LoginPage
import { action as updateVisitAction } from './components/visit/VisitItem';
import { action as updateRentalAction } from './components/rental/RentalItem';
import { action as loginAction } from './pages/Login';
import Overview from './pages/Overview';
import SingleRental from './pages/SingleRental';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/login', // Add a route for the login page
    element: <Login />,
    action: loginAction,
    errorElement: <Error />,
  },
  {
    path: '/',
    element: <DashboardPage />,
    loader: allRentalsLoader,
    action: createRentalAction,
    errorElement: <Error />,
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
