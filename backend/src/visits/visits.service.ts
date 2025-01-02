import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return await this.visitModel.find().sort({ createdAt: -1 }).exec();
  }
}
