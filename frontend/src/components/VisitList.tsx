import type { FC } from 'react';
import { GetVisitResponseDto } from '../api/response.dto';
import VisitItem from './visit/VisitItem';

interface VisitListProps {
  data: GetVisitResponseDto[];
}

const VisitList: FC<VisitListProps> = ({ data }) => {
  return (
    <div>
      {data.map((visit) => (
        <VisitItem key={visit.id} visit={visit} />
      ))}
    </div>
  );
};
export default VisitList;
