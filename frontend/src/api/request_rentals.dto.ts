import { IsString, IsDateString, IsOptional } from 'class-validator';
import { IsInt, Min, Max } from 'class-validator';
import { IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRentalDto {
  @IsString()
  name: string;
}
