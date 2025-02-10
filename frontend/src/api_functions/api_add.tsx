import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { CreateRentalDto } from '../api/request_rentals.dto';
import { useNavigate } from 'react-router-dom';

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
