export class VisitDto {
  id: string; // Use string for MongoDB ObjectId
  name: string;
  datetime: string; // ISO string for better API compatibility
  numberOfPeople: string;
  pets: string;
  jobTitle: string;
  other?: string;
  status: 'wait' | 'see' | 'interest' | 'finish' | 'ignore' | 'delete';
  createdAt: string; // ISO string for better API compatibility
}

export class GetVisitResponseDto extends VisitDto {}
