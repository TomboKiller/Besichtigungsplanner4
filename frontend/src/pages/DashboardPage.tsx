import { useLoaderData } from 'react-router-dom';
import VisitList from '../components/VisitList';
import { GetVisitResponseDto } from '../api/response.dto'; // Adjust the import path as necessary
import Modal from '../components/hyper/Modal';

export const loader = () => async () => {
  const data: GetVisitResponseDto[] = [
    {
      id: '1',
      name: 'John Doe',
      datetime: '2021-09-01T12:00:00Z',
      numberOfPeople: '2',
      pets: '1',
      jobTitle: 'Software Engineer',
      other: 'Other information',
      status: 'see',
      createdAt: '2021-09-01T12:00:00Z',
    },
    {
      id: '2',
      name: 'Jane Smith',
      datetime: '2021-09-02T14:00:00Z',
      numberOfPeople: '3',
      pets: '0',
      jobTitle: 'Product Manager',
      other: 'Additional information',
      status: 'wait',
      createdAt: '2021-09-02T14:00:00Z',
    },
  ];
  return data;
};

const DashboardPage = () => {
  const visits = useLoaderData() as GetVisitResponseDto[];

  return (
    <>
      <Modal />
      <VisitList data={visits} />
    </>
  );
};
export default DashboardPage;
