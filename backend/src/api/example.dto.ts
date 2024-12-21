import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ExampleDto {
  @ApiProperty({
    description: 'Property description'
  })
  @IsString()
  @IsNotEmpty()
  test: string;

  other: number;
}