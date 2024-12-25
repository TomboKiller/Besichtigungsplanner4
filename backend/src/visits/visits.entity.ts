import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
export const VISIT_STATUS_VALUES = <const>[
  'wait',
  'see',
  'interest',
  'finish',
  'ignore',
];
export type VisitStatus = (typeof VISIT_STATUS_VALUES)[number];

export type VisitDocument = Visit & Document & { _id: Types.ObjectId };

@Schema({ collection: 'visits' })
export class Visit {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Date, required: true }) // Define a date property
  datetime: Date;

  @Prop()
  numberOfPeople: string;

  @Prop()
  pets: string;

  @Prop()
  jobTitle: string;

  @Prop()
  other?: string;

  @Prop({ enum: VISIT_STATUS_VALUES, required: true }) // Define an enum property
  status: VisitStatus; // Use the enum type

  @Prop({ default: Date.now }) // Add the createdAt property with a default value
  createdAt: Date;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
