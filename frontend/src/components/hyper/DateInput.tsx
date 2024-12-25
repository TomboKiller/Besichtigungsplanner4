import type { FC, ReactNode } from 'react';

interface DateInputProps {
  children: ReactNode;
  value: string;
  onChange: (value: string) => void;
  name?: string;
  disabled?: boolean;
}

const DateInput: FC<DateInputProps> = ({
  children,
  value,
  onChange,
  name,
  disabled,
}) => {
  return (
    <div className="relative flex space-x-2">
      <div className="relative flex-1">
        {children}
        <input
          className="w-full rounded-lg border border-gray-200 p-3 pl-10 text-sm"
          type="datetime-local"
          value={value}
          disabled={disabled}
          onChange={(evt) => onChange(evt.target.value)}
          name={name}
        />
      </div>
    </div>
  );
};

export default DateInput;
