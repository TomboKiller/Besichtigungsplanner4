import { useNavigate } from 'react-router-dom';
import { delete_visit } from '../../api_functions/api_buttons';
// @ts-ignore
import DeleteIcon from '../../assets/delete.svg?react';

interface ButtonDeleteProps {
  visit_id: string;
}

const Button_delete = ({ visit_id }: ButtonDeleteProps) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    await delete_visit(visit_id);
    navigate('/');
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
export default Button_delete;
