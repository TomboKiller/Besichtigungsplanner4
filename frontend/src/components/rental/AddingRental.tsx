import { ActionFunctionArgs, Form } from 'react-router-dom';
import { add_rental } from '../../api_functions/api_add';
import { useState } from 'react';

// @ts-ignore
import HouseIcon from '../../assets/house.svg?react';
import Input from '../hyper/Input';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  await add_rental(data);
  return window.location.reload();
};

const AddingRental = () => {
  const [newUnitName, setNewUnitName] = useState('');

  return (
    <div>
      <div className="flex flex-col text-gray-700 p-2 rounded-md hover:bg-gray-100 mb-10">
        <Form method="post">
          <Input
            name="name"
            disabled={false}
            placeholder="Wohneinheit hinzufügen"
            value={newUnitName}
            onChange={(name) => setNewUnitName(name)}
          >
            <HouseIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          </Input>

          <div className="flex flex-col space-y-2 mt-2 w-full">
            <button
              type="submit"
              className="w-full text-white px-2 py-1 rounded-md bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
            >
              <svg
                className="h-5 w-5 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddingRental;
