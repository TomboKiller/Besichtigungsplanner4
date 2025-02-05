import { GetVisitResponseDto } from '../api/response.dto';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

type UpdateStateProps = {
  visit_id: string;
  status: GetVisitResponseDto['status'];
};

export const delete_visit = async (visit_id: string) => {
  try {
    await customFetch.delete(`/visits/${visit_id}`);
    toast.success('Visit deleted or restore successfully');
    return null;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Something went wrong';
    toast.error(errorMessage);
    console.error(error.response?.data?.details);
    return error;
  }
};

export const update_status_visit = async ({
  visit_id,
  status,
}: UpdateStateProps) => {
  try {
    await customFetch.patch(`/visits/state/${visit_id}`, { Status: status });
    toast.success('Visit Status updated successfully');
    return null;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Something went wrong';
    toast.error(errorMessage);
    console.error(error.response?.data?.details);
    return error;
  }
};

export const ignore_visit = async (visit_id: string) => {
  try {
    await customFetch.delete(`/visits/state/${visit_id}`);
    toast.success('Anfrage wurde abgebrochen');
    return null;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Something went wrong';
    toast.error(errorMessage);
    console.error(error.response?.data?.details);
    return error;
  }
};
