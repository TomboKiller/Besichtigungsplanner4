export class RentalDto {
  id: string; // Use string for MongoDB ObjectId
  name: string;
  createdAt: string; // ISO string for better API compatibility
}

export class GetRentalResponseDto extends RentalDto {}
