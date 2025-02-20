import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GetRentalResponseDto } from 'src/api/response_rentals.dto';
import { RentalsService } from './rentals.service';
import { RentalDocument } from './entities/rental.entity';
import { CreateRentalDto } from 'src/api/request_rentals.dto';
@Controller('api/v1/rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  async getRentals(): Promise<GetRentalResponseDto[]> {
    const rentals = await this.rentalsService.getRentals();
    return rentals.map((rental) => this.mapRentalToResponse(rental));
  }

  @Post()
  async createVisit(
    @Body() createRentalDto: CreateRentalDto,
  ): Promise<GetRentalResponseDto> {
    const newRental = await this.rentalsService.createRental(createRentalDto);
    return this.mapRentalToResponse(newRental);
  }

  @Patch('/:id')
  async updateRental(
    @Param('id') id: string,
    @Body() updateRentalDto: CreateRentalDto,
  ): Promise<GetRentalResponseDto> {
    const updatedRental = await this.rentalsService.updateRental(
      id,
      updateRentalDto,
    );
    return this.mapRentalToResponse(updatedRental);
  }

  @Delete('/:id')
  async deleteRental(@Param('id') id: string): Promise<string> {
    return await this.rentalsService.deleteVisit(id);
  }

  mapRentalToResponse(visit: RentalDocument): GetRentalResponseDto {
    return {
      id: visit._id.toString(),
      name: visit.name,
      createdAt: visit.createdAt.toISOString(),
    };
  }
}
