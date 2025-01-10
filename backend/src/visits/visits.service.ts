import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Visit, VisitDocument } from './visits.entity';
import { Model } from 'mongoose';
import { CreateVisitDto } from 'src/api/request.dto';

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit.name) private readonly visitModel: Model<VisitDocument>,
  ) {}

  async createVisit(createVisitDto: CreateVisitDto): Promise<VisitDocument> {
    try {
      const newVisit = new this.visitModel({
        ...createVisitDto,
        status: 'wait',
      });
      return await newVisit.save();
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

  async getVisits(): Promise<VisitDocument[]> {
    return await this.visitModel
      .find({ status: { $ne: 'delete' } })
      .sort({ createdAt: -1 })
      .exec();
  }
  async getdeletedVisits(): Promise<VisitDocument[]> {
    return await this.visitModel
      .find({ status: 'delete' })
      .sort({ createdAt: -1 })
      .exec();
  }
  async deleteVisit(id: string): Promise<string> {
    const visit = await this.visitModel.findById(id).exec();

    if (!visit) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }
    await this.visitModel.findByIdAndUpdate(id, { status: 'delete' }).exec();
    // await this.visitModel.findByIdAndDelete(id).exec();
    return 'Visit deleted successfully';
  }
}
