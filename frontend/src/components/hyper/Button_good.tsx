import { GetVisitResponseDto } from '../../api/response.dto';
import { FC } from 'react';
import { update_status_visit } from '../../api_functions/api_buttons';
import { useNavigate } from 'react-router-dom';

// Improved type definitions
interface StatusButtonProps {
  status: GetVisitResponseDto['status'];
  active: boolean;
  disabled?: boolean;
  onClick?: () => void;
  visit_id: string;
}

interface ButtonStyle {
  color: string;
  buttonText: string;
  ariaLabel: string;
}

// Improved button styles mapping
const STATUS_BUTTON_STYLES: Record<GetVisitResponseDto['status'], ButtonStyle> =
  {
    interest: {
      color: 'bg-gradient-to-r from-green-300 via-green-500 to-green-700',
      buttonText: 'Abschluss',
      ariaLabel: 'Mark as completed',
    },
    finish: {
      color: 'hidden',
      buttonText: '',
      ariaLabel: '',
    },
    ignore: {
      color: 'hidden',
      buttonText: '',
      ariaLabel: '',
    },
    wait: {
      color: 'bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700',
      buttonText: 'Gesehen',
      ariaLabel: 'Mark as visited',
    },
    see: {
      color: 'bg-gradient-to-r from-violet-300 via-violet-500 to-violet-700',
      buttonText: 'Interesse',
      ariaLabel: 'Mark as seen',
    },
    delete: {
      color: 'hidden',
      buttonText: '',
      ariaLabel: '',
    },
  };

const Button_good: FC<StatusButtonProps> = ({ status, active, visit_id }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    await update_status_visit({ visit_id, status });
    navigate('.');
  };

  return (
    <div className="flex justify-center">
      <button
        className={`group inline-block rounded-full ${STATUS_BUTTON_STYLES[status].color} p-[3px] hover:text-white focus:outline-none active:text-opacity-75 ${
          active ? 'hidden' : ''
        }`}
        onClick={handleClick}
      >
        <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
          {STATUS_BUTTON_STYLES[status].buttonText}
        </span>
      </button>
    </div>
  );
};

export default Button_good;
