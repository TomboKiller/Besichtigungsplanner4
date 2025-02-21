import { Module } from '@nestjs/common';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Visit, VisitSchema } from './visits.entity';
import { Rental, RentalSchema } from 'src/rentals/entities/rental.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Visit.name, schema: VisitSchema },
      { name: Rental.name, schema: RentalSchema },
    ]),
  ],
  controllers: [VisitsController],
  providers: [VisitsService],
})
export class VisitsModule {}
