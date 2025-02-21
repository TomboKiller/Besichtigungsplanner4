import { useNavigate } from 'react-router-dom';
import { delete_rental, delete_visit } from '../../api_functions/api_buttons';
// @ts-ignore
import DeleteIcon from '../../assets/delete.svg?react';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface ButtonDeleteVisitProps {
  visit_id: string;
}
interface ButtonDeleteRentalProps {
  rental_id: string;
}

export const Button_delete_visititem = ({
  visit_id,
}: ButtonDeleteVisitProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    Swal.fire({
      title: 'Bist du dir sicher?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(32, 158, 0)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ja, löschen!',
      cancelButtonText: 'Abbrechen',
      preConfirm: async () => {
        await delete_visit(visit_id);
        navigate('/');
      },
    });
  };

  return (
    <button
      // type="submit"
      onClick={handleClick}
      className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
    >
      <span>
        <DeleteIcon />
      </span>
    </button>
  );
};

export const Button_delete_rentalitem = ({
  rental_id,
}: ButtonDeleteRentalProps) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    Swal.fire({
      title: 'Bist du dir sicher?',
      icon: 'warning',
      text: 'Die Wohneinheit und alle Besichtigungen werden unwiderruflich gelöscht!',
      showCancelButton: true,
      confirmButtonColor: 'rgb(32, 158, 0)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ja, löschen!',
      cancelButtonText: 'Abbrechen',
      preConfirm: async () => {
        await delete_rental(rental_id);
        navigate('/');
      },
    });
  };

  return (
    <button
      className={`w-full text-white px-2 py-1 rounded-md bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700`}
      title="Wohneinheit löschen"
      onClick={handleClick}
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
  );
};
function setInputValue(arg0: string) {
  throw new Error('Function not implemented.');
}
