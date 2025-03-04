import { useLoaderData, useParams, Params } from 'react-router-dom';

import Modal from '../components/visit/Modal';
import VisitList from '../components/VisitList';
import { GetVisitResponseDto } from '../api/response.dto';
import { GetRentalResponseDto } from '../api/response_rentals.dto';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

interface LoaderData {
  visits: GetVisitResponseDto[];
  rental: GetRentalResponseDto;
}

export const loader = async ({ params }: { params: Params }) => {
  try {
    const [visitsResponse, rentalResponse] = await Promise.all([
      customFetch<GetVisitResponseDto[]>(`/visits/${params.id}`),
      customFetch<GetRentalResponseDto>(`/rentals/${params.id}`),
    ]);

    return {
      visits: visitsResponse.data,
      rental: rentalResponse.data,
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Something went wrong';
    toast.error(errorMessage);
    console.error(error.response?.data?.details);
    return error;
  }
};

const SingleRental = () => {
  const { visits, rental } = useLoaderData() as LoaderData;
  const { id } = useParams();

  return (
    <>
      <h2 className="text-center my-6 text-3xl text-gray-600">
        Besichtigungen für {rental.name}
      </h2>
      <Modal param={id} />
      <VisitList data={visits} />
      <section className="mt-8"></section>
    </>
  );
};

export default SingleRental;
