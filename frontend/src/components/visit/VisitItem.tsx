import { useState, type FC } from 'react';
import CardHeader from '../hyper/CardHeader';
import Card from '../hyper/Card';
import { GetVisitResponseDto } from '../../api/response.dto';
import CardContent from '../hyper/CardContent';
import Button_edit from '../hyper/Button_edit';
import Button_delete from '../hyper/Button_delete';
import Button from '../hyper/Button';
import { ActionFunctionArgs, Form } from 'react-router-dom';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';

// import Button from '../hyper/button';

interface VisitItemProps {
  visit: GetVisitResponseDto;
}

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   console.log(data);

//   // try {
//   //   await customFetch.post('/', data);
//   //   toast.success('Visit added successfully ');
//   //   return null;
//   // } catch (error: any) {
//   //   const errorMessage = error.response?.data?.error || 'Something went wrong';
//   //   toast.error(errorMessage);
//   //   console.error(error.response?.data?.details);
//   //   return error;
//   // }
// };

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    await customFetch.patch(`/${params.id}`, data);
    toast.success('Visit added successfully ');
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
        <Button_delete visit_id={visit.id} />
      </div>
      <Form method="post" action={`/visits/${visit.id}`}>
        <CardContent visit={visit} edit={edit}></CardContent>
        <Button active={edit}>Edit</Button>
      </Form>
    </Card>
  );
};

export default VisitItem;
