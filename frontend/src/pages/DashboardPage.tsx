import { Outlet, useLoaderData } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import customFetch from '../utils/customFetch';
import { GetRentalResponseDto } from '../api/response_rentals.dto';
type LoaderData = {
  rentals: {
    data: GetRentalResponseDto[];
  };
};

export const loader = async () => {
  try {
    const rentals = await customFetch<GetRentalResponseDto[]>('/rentals');
    return { rentals };
  } catch (error) {}
};

const DashboardPage = () => {
  const { rentals } = useLoaderData() as LoaderData;

  return (
    <>
      <Sidebar data={rentals.data} />
      <Outlet />
    </>
  );
};
export default DashboardPage;
