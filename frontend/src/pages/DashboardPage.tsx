import { useLoaderData } from 'react-router-dom';
import VisitList from '../components/VisitList';
import Archive_visits from '../components/hyper/Archive_visits';
import { GetVisitResponseDto } from '../api/response.dto'; // Adjust the import path as necessary
import Modal from '../components/hyper/Modal';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = () => async () => {
  // const data: GetVisitResponseDto[] = [
  //   {
  //     id: '1',
  //     name: 'John Doe',
  //     datetime: '2021-09-01T12:00:00Z',
  //     numberOfPeople: '2',
  //     pets: '1',
  //     jobTitle: 'Software Engineer',
  //     other: 'Other information',
  //     status: 'see',
  //     createdAt: '2021-09-01T12:00:00Z',
  //   },
  //   {
  //     id: '2',
  //     name: 'Jane Smith',
  //     datetime: '2021-09-02T14:00:00Z',
  //     numberOfPeople: '3',
  //     pets: '0',
  //     jobTitle: 'Product Manager',
  //     other: 'Additional information',
  //     status: 'wait',
  //     createdAt: '2021-09-02T14:00:00Z',
  //   },
  // ];

  try {
    const visits = await customFetch<GetVisitResponseDto[]>('/');
    const visits_deleted = await customFetch<GetVisitResponseDto[]>('/deleted');
    const loaderData = {
      visits: visits.data,
      visits_deleted: visits_deleted.data,
    };
    return loaderData;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Something went wrong';
    toast.error(errorMessage);
    console.error(error.response?.data?.details);
    return error;
  }
};

const DashboardPage = () => {
  const loaderData = useLoaderData() as GetVisitResponseDto[];
  console.log(loaderData);

  return (
    <>
      <Modal />
      <VisitList data={loaderData.visits} />

      <Archive_visits visits_deleted={loaderData.visits_deleted} />
    </>
  );
};
export default DashboardPage;
