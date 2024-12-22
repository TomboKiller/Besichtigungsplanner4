export class GetVisitResponseDto {
  id: string; // Use string for MongoDB ObjectId
  name: string;
  datetime: string; // ISO string for better API compatibility
  numberOfPeople: string;
  pets: string;
  jobTitle: string;
  other?: string;
  status: string; // Enum as a string for clarity
  createdAt: string; // ISO string for better API compatibility
}
