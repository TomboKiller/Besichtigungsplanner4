import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const delete_visit = async ({ visit_id }) => {
  try {
    await customFetch.delete(`/${visit_id}`);
    toast.success('Visit deleted successfully');
    return null;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Something went wrong';
    toast.error(errorMessage);
    console.error(error.response?.data?.details);
    return error;
  }
};
