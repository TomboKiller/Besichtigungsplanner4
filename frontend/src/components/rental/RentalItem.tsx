import { FC, useState } from 'react';
import Input from '../hyper/Input';
// @ts-ignore
import HouseIcon from '../../assets/house.svg?react';
import { GetRentalResponseDto } from '../../api/response_rentals.dto';
import { ActionFunctionArgs, Form, useNavigate } from 'react-router-dom';
import { edit_rental } from '../../api_functions/api_add';

interface ListRentalProps {
  units: GetRentalResponseDto;
  isAddingUnit: boolean;
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const navigate = useNavigate();
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await edit_rental({ params }, data);
  return navigate('/');
};

const RentalItem: FC<ListRentalProps> = ({ units, isAddingUnit }) => {
  const [state, setState] = useState<GetRentalResponseDto>(units);
  return (
    <div>
      <div
        key={units.id}
        className="flex flex-col text-gray-700 px-2 py-2 rounded-md hover:bg-gray-100"
      >
        <Form method="post" action={`/rentals/${units.id}`}>
          <Input
            name="name"
            disabled={!isAddingUnit}
            placeholder="Name*"
            value={state.name}
            onChange={(name) => {
              setState((s) => ({ ...s, name }));
            }}
          >
            <HouseIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          </Input>
          {isAddingUnit && (
            <div className="flex flex-col gap-2 mt-2 w-full">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 rounded-md hover:from-green-500 hover:to-green-700"
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
              <button
                className="w-full bg-gradient-to-r from-red-400 to-red-600 text-white px-2 pt-1 pb-1 rounded-md hover:from-red-500 hover:to-red-700"
                title="Wohneinheit löschen"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default RentalItem;
