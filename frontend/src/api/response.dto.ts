import { GetRentalResponseDto } from './response_rentals.dto';

export class VisitDto {
  id: string; // Use string for MongoDB ObjectId
  name: string;
  datetime?: string; // ISO string for better API compatibility
  numberOfPeople: string;
  pets: string;
  jobTitle: string;
  other?: string;
  status: 'wait' | 'see' | 'interest' | 'finish' | 'ignore' | 'delete';
  createdAt: string; // ISO string for better API compatibility
  rental_id: string;
  rental?: GetRentalResponseDto;
}

export class GetVisitResponseDto extends VisitDto {}
