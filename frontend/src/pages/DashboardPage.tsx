import { useLoaderData } from 'react-router-dom';
import VisitList from '../components/VisitList';
import { GetVisitResponseDto } from '../api/response.dto'; // Adjust the import path as necessary

export const loader = () => async (): Promise<GetVisitResponseDto> => {
  const data = [
    {
      id: '1',
      name: 'John Doe',
      datetime: '2021-09-01T12:00:00Z',
      numberOfPeople: '2',
      pets: '1',
      jobTitle: 'Software Engineer',
      other: 'Other information',
      status: 'wait',
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
      status: 'interest',
      createdAt: '2021-09-02T14:00:00Z',
    },
  ];
  return data;
};

const DashboardPage = () => {
  const visits = useLoaderData() as GetVisitResponseDto;

  return (
    <>
      <VisitList data={visits} />
    </>
  );
};
export default DashboardPage;
