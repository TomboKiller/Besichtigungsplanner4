import type { FC } from 'react';
import { GetVisitResponseDto } from '../../api/response.dto';

interface CardHeaderProps {
  status: GetVisitResponseDto['status'];
}

const statusColorClassMap: Record<GetVisitResponseDto['status'], string> = {
  see: 'bg-gradient-to-r from-violet-300 via-violet-500 to-violet-700',
  wait: 'bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700',
  interest: 'bg-gradient-to-r from-green-300 via-green-500 to-green-700',
  finish: 'bg-green-500',
  ignore: 'bg-gray-400',
};
const CardHeader: FC<CardHeaderProps> = ({ status }) => {
  return (
    <div
      className={'absolute inset-x-0 top-0 h-2 ' + statusColorClassMap[status]}
    ></div>
  );
};

export default CardHeader;
