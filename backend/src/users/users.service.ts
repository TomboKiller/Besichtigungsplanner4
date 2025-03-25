import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.entity';
import { InjectModel } from '@nestjs/mongoose';
import { hashPassword } from './utils/passwordUtils';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john@gmail.com',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ username });
  }

  async createUser(username: string, password: string): Promise<UserDocument> {
    const hashedPassword = await hashPassword(password);
    const user = new this.userModel({ username, hashedPassword });
    return user.save();
  }
}
