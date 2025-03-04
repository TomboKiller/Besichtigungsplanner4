import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    return await this.rentalModel
      .find({ status: { $ne: 'delete' } })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getSingleRental(id: string): Promise<RentalDocument> {
    return await this.rentalModel.findById(id).exec();
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

  async updateRental(
    id: string,
    updateRentalDto: CreateRentalDto,
  ): Promise<RentalDocument> {
    const rental = await this.rentalModel.findById(id).exec();

    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }
    return await this.rentalModel
      .findByIdAndUpdate(id, updateRentalDto, { new: true })
      .exec();
  }

  async deleteVisit(id: string): Promise<string> {
    const rental = await this.rentalModel.findById(id).exec();

    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }

    await this.rentalModel.findByIdAndUpdate(id, { status: 'delete' }).exec();
    return 'Rental deleted successfully';
  }
}
