import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type RentalDocument = Rental & Document & { _id: Types.ObjectId };

export const STATUS_VALUES = ['active', 'delete'] as const;
export type StatusType = (typeof STATUS_VALUES)[number];

@Schema({ collection: 'rentals' })
export class Rental {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: String,
    required: true,
    default: STATUS_VALUES[0],
    enum: STATUS_VALUES,
  })
  status: StatusType;

  @Prop({ default: Date.now }) // Add the createdAt property with a default value
  createdAt: Date;
}

export const RentalSchema = SchemaFactory.createForClass(Rental);
