import { useLoaderData, useParams, Params } from 'react-router-dom';

import Modal from '../components/visit/Modal';
import VisitList from '../components/VisitList';
import { GetVisitResponseDto } from '../api/response.dto';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async ({ params }: { params: Params }) => {
  try {
    const visits = await customFetch<GetVisitResponseDto[]>(
      `/visits/${params.id}`
    );
    return visits.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Something went wrong';
    toast.error(errorMessage);
    console.error(error.response?.data?.details);
    return error;
  }
};

const SingleRental = () => {
  const loaderData = useLoaderData() as GetVisitResponseDto[];

  console.log(useParams().id);

  return (
    <>
      <Modal param={useParams().id} />
      <VisitList data={loaderData} />
      <section className="mt-8"></section>
    </>
  );
};
export default SingleRental;
