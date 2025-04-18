import type { FC } from 'react';

interface ButtonProps {
  children: String;
  active?: boolean;
  setEdit?: any;
}

const Button: FC<ButtonProps> = ({ children, active }) => {
  return (
    <div className="flex justify-center ">
      <button type="submit" hidden={active}>
        <a className="group inline-block rounded-full bg-gradient-to-r from-green-300 via-green-500 to-green-700 p-[3px] hover:text-white focus:outline-none active:text-opacity-75">
          <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
            {children}
          </span>
        </a>
      </button>
    </div>
  );
};

export default Button;
