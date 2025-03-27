import CardContent from '../hyper/CardContent';
import { ActionFunctionArgs, Form } from 'react-router-dom';
import Button from '../hyper/Button';
import customFetch from '../../utils/customFetch';
import { useState } from 'react';
import { toast } from 'react-toastify';
// @ts-ignore
import Plus from '../../assets/plus.svg?react';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/visits/', data);
    toast.success('Visit added successfully ');
    return null;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Something went wrong';
    toast.error(errorMessage);
    console.error(error.response?.data?.details);
    return error;
  }
};

interface ModalProps {
  param: string;
}

const Modal = ({ param }: ModalProps) => {
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   if (actionData === true) {
  //     {
  //       setShowModal(false);
  //       const actionData = false;
  //     }
  //   }
  // }, [actionData]);
  return (
    <>
      <div className="w-full flex justify-center mt-8">
        <button
          className="inline-block rounded-full bg-gradient-to-r from-green-300 via-green-500 to-green-700 p-3 text-white hover:bg-transparent hover:text-green-600 focus:outline-none active:text-indigo-500"
          onClick={() => setShowModal(!showModal)}
        >
          <span className="sr-only"> ADD </span>
          <Plus />
        </button>
      </div>
      {showModal && (
        <div className="my-10 shadow-lg relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 inset-0 items-center justify-center">
          <span className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-green-300 via-green-500 to-green-700"></span>
          <div className="-my-3">
            <Form
              method="post"
              onSubmit={() => {
                setShowModal(false);
              }}
              className="form"
            >
              <input type="hidden" name="rental" value={param} />
              <CardContent />
              <Button> ADD </Button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
