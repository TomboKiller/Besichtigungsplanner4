import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserDocument = User & Document & { _id: Types.ObjectId };

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  hashedPassword: string;

  @Prop({ default: Date.now }) // Add the createdAt property with a default value
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
