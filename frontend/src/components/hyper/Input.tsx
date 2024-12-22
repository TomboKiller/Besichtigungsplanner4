import type { FC, ReactNode } from 'react';

interface InputProps {
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  name?: string;
  placeholder?: string;
}

const Input: FC<InputProps> = ({
  children,
  placeholder,
  name,
  onChange,
  value,
  disabled,
}) => {
  return (
    <div className="relative">
      {children}
      <input
        disabled={disabled}
        className="w-full rounded-lg border border-gray-200 p-3 pl-10 text-sm"
        placeholder={placeholder}
        onChange={(evt) => onChange(evt.target.value)}
        value={value}
        type="text"
        name={name}
        required
      />
    </div>
  );
};

export default Input;
