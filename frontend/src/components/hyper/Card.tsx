import type { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card: FC<CardProps> = ({ children }) => {
  return (
    <a className="my-10 shadow-lg relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
      {children}
    </a>
  );
};

export default Card;
