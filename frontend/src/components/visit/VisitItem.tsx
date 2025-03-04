import { useState, type FC } from 'react';
import CardHeader from '../hyper/CardHeader';
import Card from '../hyper/Card';
import { GetVisitResponseDto } from '../../api/response.dto';
import CardContent from '../hyper/CardContent';
import Button_edit from '../hyper/Button_edit';
import { Button_delete_visititem } from '../hyper/Button_delete';
import Button from '../hyper/Button';
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigate,
} from 'react-router-dom';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';
import Button_good from '../hyper/Button_good';
import ReactConfetti from 'react-confetti';
import Button_bad from '../hyper/Button_bad';

interface VisitItemProps {
  visit: GetVisitResponseDto;
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/visits/${params.id}`, data);
    toast.success('Visit updated successfully ');
    return null;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Something went wrong';
    toast.error(errorMessage);
    console.error(error.response?.data?.details);
    return error;
  }
};

const VisitItem: FC<VisitItemProps> = ({ visit }) => {
  const [edit, setEdit] = useState(true);

  return (
    <Card>
      <CardHeader status={visit.status}></CardHeader>
      <div className="relative flex gap-2 justify-end">
        <Button_edit onClick={() => setEdit(!edit)} />
        <Button_delete_visititem visit_id={visit.id} />
      </div>
      <Form
        method="post"
        action={`/visits/${visit.id}`}
        onSubmit={() => setEdit(!edit)}
      >
        <CardContent visit={visit} edit={edit}></CardContent>
        <Button active={edit}>Edit</Button>
      </Form>
      <div className="flex gap-2 justify-center">
        <Button_good visit_id={visit.id} active={!edit} status={visit.status} />
        <Button_bad visit_id={visit.id} active={!edit} status={visit.status} />
      </div>
      {visit.status === 'finish' && (
        <div className="pointer-events-none">
          <ReactConfetti />
        </div>
      )}
    </Card>
  );
};

export default VisitItem;
