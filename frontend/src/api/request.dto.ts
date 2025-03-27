import { IsString, IsOptional } from 'class-validator';
import { IsInt, Min, Max } from 'class-validator';
import { IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindVisitDto {
  @IsMongoId()
  id: string;
}

export class CreateVisitDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  datetime: string;

  @IsString()
  numberOfPeople: string;

  @IsString()
  pets: string;

  @IsString()
  jobTitle: string;

  @IsOptional()
  @IsString()
  other?: string;

  @IsMongoId()
  rental?: string;
}

export class PaginateQueryDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => Number(value), { toClassOnly: true }) // Transform string to number
  offset?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => Number(value), { toClassOnly: true }) // Transform string to number
  limit?: number = 10;
}
