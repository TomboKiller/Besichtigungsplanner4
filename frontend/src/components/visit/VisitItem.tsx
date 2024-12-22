import type { FC } from 'react';
import CardHeader from '../hyper/CardHeader';
import Card from '../hyper/Card';
import { GetVisitResponseDto } from '../../api/response.dto';
import CardContent from '../hyper/CardContent';
// import Button from '../hyper/button';

interface VisitItemProps {
  visit: GetVisitResponseDto;
}

const VisitItem: FC<VisitItemProps> = ({ visit }) => {
  return (
    <Card>
      <CardHeader status={visit.status}></CardHeader>
      <CardContent visit={visit}></CardContent>
    </Card>
  );
};

export default VisitItem;
