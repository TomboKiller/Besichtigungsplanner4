import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { CreateRentalDto } from '../api/request_rentals.dto';

export const add_rental = async (data: CreateRentalDto) => {
  try {
    await customFetch.post('/rentals/', data);
    toast.success('Rental added successfully ');
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Something went wrong';
    toast.error(errorMessage);
    console.error(error.response?.data?.details);
    return error;
  }
};

interface EditRentalParams {
  params: {
    id: string;
  };
}

export const edit_rental = async (
  { params }: EditRentalParams,
  data: CreateRentalDto
) => {
  try {
    console.log(data);

    await customFetch.patch(`/rentals/${params.id}`, data);
    toast.success('Rental updated successfully ');
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Something went wrong';
    toast.error(errorMessage);
    console.error(error.response?.data?.details);
    return error;
  }
};
