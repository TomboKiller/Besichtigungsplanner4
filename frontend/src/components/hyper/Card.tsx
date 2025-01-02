import type { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card: FC<CardProps> = ({ children }) => {
  return (
    <a className="my-10 shadow-lg relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="absolute mt-2 mb-2 top-2 right-2 flex gap-2"></div>
      <div className="">{children}</div>
    </a>
  );
};

export default Card;
