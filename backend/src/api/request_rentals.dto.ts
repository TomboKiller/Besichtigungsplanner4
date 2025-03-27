import { IsString } from 'class-validator';

export class CreateRentalDto {
  @IsString()
  name: string;
}
