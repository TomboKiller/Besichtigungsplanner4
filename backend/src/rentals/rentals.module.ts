import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rental, RentalSchema } from './entities/rental.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rental.name, schema: RentalSchema }]),
  ],
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}
