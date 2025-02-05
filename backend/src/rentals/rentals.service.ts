import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRentalDto } from 'src/api/request_rentals.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rental, RentalDocument } from './entities/rental.entity';
import { Model } from 'mongoose';

@Injectable()
export class RentalsService {
  constructor(
    @InjectModel(Rental.name)
    private readonly rentalModel: Model<RentalDocument>,
  ) {}

  async getRentals(): Promise<RentalDocument[]> {
    return await this.rentalModel.find().sort({ createdAt: -1 }).exec();
  }

  async createRental(
    createRentalDto: CreateRentalDto,
  ): Promise<RentalDocument> {
    try {
      const newRental = new this.rentalModel({ ...createRentalDto });
      return await newRental.save();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to create visit',
          details: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
