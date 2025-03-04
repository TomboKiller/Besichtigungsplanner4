import { FC } from 'react';
import { GetVisitResponseDto } from '../../api/response.dto';
import { ignore_visit } from '../../api_functions/api_buttons';
import { useNavigate } from 'react-router-dom';

interface StatusButtonProps {
  status: GetVisitResponseDto['status'];
  active: boolean;
  visit_id: string;
}

const Button_bad: FC<StatusButtonProps> = ({ active, visit_id, status }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    await ignore_visit(visit_id);
    navigate('.');
  };
  return (
    <>
      {status !== 'ignore' && status !== 'delete' && (
        <div className="flex justify-center">
          <button
            className={`group inline-block rounded-full bg-gradient-to-r from-red-300 via-red-500 to-red-700 p-[3px] hover:text-white focus:outline-none active:text-opacity-75 ${
              active ? 'hidden' : ''
            }`}
            onClick={handleClick}
          >
            <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
              Abbruch
            </span>
          </button>
        </div>
      )}
    </>
  );
};
export default Button_bad;
