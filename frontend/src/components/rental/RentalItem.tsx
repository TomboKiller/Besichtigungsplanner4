import { FC, useState } from 'react';
import Input from '../hyper/Input';
// @ts-ignore
import HouseIcon from '../../assets/house.svg?react';
import { GetRentalResponseDto } from '../../api/response_rentals.dto';
import { ActionFunctionArgs, Form, NavLink, redirect } from 'react-router-dom';
import { edit_rental } from '../../api_functions/api_add';
import { Button_delete_rentalitem } from '../hyper/Button_delete';

/* Mal ein test das css so zu verwenden */
const styles = {
  container: 'flex flex-col text-gray-700 p-2 rounded-md hover:bg-gray-100',
  buttonContainer: 'flex flex-col space-y-2 mt-2 w-full',
  buttonBase: 'w-full text-white px-2 py-1 rounded-md',
  submitButton:
    'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700',
  deleteButton:
    'bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700',
  iconBase: 'h-5 w-5 mx-auto',
  houseIcon: 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4',
};

interface ListRentalProps {
  units: GetRentalResponseDto;
  setisAddingUnit: (isAddingUnit: boolean) => void;
  isAddingUnit: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isActive?: boolean;
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await edit_rental({ params }, data);
  return redirect('/');
};

const RentalItem: FC<ListRentalProps> = ({
  units,
  isAddingUnit,
  setisAddingUnit,
  setIsOpen,
  isActive,
}) => {
  const [state, setState] = useState<GetRentalResponseDto>(units);
  return (
    <div>
      <div
        key={units.id}
        className={`${styles.container} ${isActive ? 'bg-gray-100' : ''} `}
      >
        <Form
          method="post"
          onSubmit={() => setisAddingUnit(false)}
          action={`/rentals/${units.id}`}
        >
          {!isAddingUnit ? (
            <NavLink
              to={`/rental/${units.id}`}
              onClick={() => setIsOpen(false)}
            >
              {state.name}
            </NavLink>
          ) : (
            <>
              <Input
                name="name"
                disabled={!isAddingUnit}
                placeholder="Name*"
                value={state.name}
                onChange={(name) => {
                  setState((s) => ({ ...s, name }));
                }}
              >
                <HouseIcon className={styles.houseIcon} />
              </Input>
              <div className={styles.buttonContainer}>
                <button
                  type="submit"
                  className={`${styles.buttonBase} ${styles.submitButton}`}
                >
                  <svg
                    className={styles.iconBase}
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
            </>
          )}
        </Form>
        {isAddingUnit && (
          <div className={styles.buttonContainer}>
            {' '}
            <Button_delete_rentalitem rental_id={units.id} />{' '}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalItem;
