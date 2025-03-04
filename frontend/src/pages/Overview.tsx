import { useLoaderData } from 'react-router-dom';
import VisitList from '../components/VisitList';
import Archive_visits from '../components/Archive_visits';
import { GetVisitResponseDto } from '../api/response.dto'; // Adjust the import path as necessary
import Modal from '../components/visit/Modal';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

type LoaderData = {
  visits: GetVisitResponseDto[];
  visits_archived: GetVisitResponseDto[];
};

export const loader = () => async () => {
  try {
    const [visits, visits_archived] = await Promise.all([
      customFetch<GetVisitResponseDto[]>('/visits'),
      customFetch<GetVisitResponseDto[]>('/visits/archived'),
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

const Overview = () => {
  const loaderData = useLoaderData() as LoaderData;

  return (
    <>
      <h2 className="text-center my-6 text-3xl  text-gray-600">
        Überblick aller geplanter Besichtigungen
      </h2>
      <VisitList data={loaderData.visits} />
      <section className="mt-8">
        <Archive_visits visits_archived={loaderData.visits_archived} />
      </section>
    </>
  );
};
export default Overview;
