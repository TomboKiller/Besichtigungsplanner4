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
      <h2 className="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-xl lg:text-4xl text-center mt-[2%]">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-600 from-green-400">
          Alle Besichtigungen
        </span>
      </h2>
      <VisitList data={loaderData.visits} />
      {/* <section className="mt-8">
        <Archive_visits visits_archived={loaderData.visits_archived} />
      </section> */}
    </>
  );
};
export default Overview;
