import { useLoaderData } from 'react-router-dom';
import VisitList from '../components/VisitList';
import Archive_visits from '../components/Archive_visits';
import { GetVisitResponseDto } from '../api/response.dto'; // Adjust the import path as necessary
import Modal from '../components/visit/Modal';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';

type LoaderData = {
  visits: GetVisitResponseDto[];
  visits_archived: GetVisitResponseDto[];
};

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
    const [visits, visits_archived] = await Promise.all([
      customFetch<GetVisitResponseDto[]>('/'),
      customFetch<GetVisitResponseDto[]>('/archived'),
    ]);
    const loaderData = {
      visits: visits.data,
      visits_archived: visits_archived.data,
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
  const loaderData = useLoaderData() as LoaderData;

  return (
    <>
      <Sidebar />
      <Modal />
      <VisitList data={loaderData.visits} />
      <section className="mt-8">
        <Archive_visits visits_archived={loaderData.visits_archived} />
      </section>
    </>
  );
};
export default DashboardPage;
