import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type RentalDocument = Rental & Document & { _id: Types.ObjectId };

@Schema({ collection: 'rentals' })
export class Rental {
  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now }) // Add the createdAt property with a default value
  createdAt: Date;
}

export const RentalSchema = SchemaFactory.createForClass(Rental);
