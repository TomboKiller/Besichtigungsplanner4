import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Visit, VisitDocument, VisitStatus } from './visits.entity';
import { Model } from 'mongoose';
import { CreateVisitDto } from 'src/api/request.dto';
import { log } from 'console';

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
      .find({ status: { $nin: ['delete', 'ignore'] } })
      .sort({ status: 1, createdAt: -1 })
      .exec();
  }
  async getarchivedVisits(): Promise<VisitDocument[]> {
    return await this.visitModel
      .find({ status: { $in: ['delete', 'ignore'] } })
      .sort({ createdAt: -1 })
      .exec();
  }
  async deleteVisit(id: string): Promise<string> {
    const visit = await this.visitModel.findById(id).exec();

    if (!visit) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }

    if (visit.status === 'delete') {
      await this.visitModel.findByIdAndUpdate(id, { status: 'wait' }).exec();
      return 'Visit restored successfully';
    }
    if (visit.status === 'ignore') {
      await this.visitModel.findByIdAndUpdate(id, { status: 'wait' }).exec();
      return 'Visit restored successfully';
    }
    await this.visitModel.findByIdAndUpdate(id, { status: 'delete' }).exec();
    // await this.visitModel.findByIdAndDelete(id).exec();
    return 'Visit deleted successfully';
  }
  async updateVisit(
    id: string,
    updateVisitDto: CreateVisitDto,
  ): Promise<VisitDocument> {
    const visit = await this.visitModel.findById(id).exec();

    if (!visit) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }
    return await this.visitModel
      .findByIdAndUpdate(id, updateVisitDto, { new: true })
      .exec();
  }

  async updateState(
    id: string,
    visit_status: { Status: VisitStatus },
  ): Promise<VisitDocument> {
    const visit = await this.visitModel.findById(id).select('status').exec();

    if (visit.status !== visit_status.Status) {
      throw new NotFoundException(
        `Der Status wurde bereits geändert auf: ${visit.status}`,
      );
    }

    switch (visit.status) {
      case 'wait':
        return await this.visitModel
          .findByIdAndUpdate(id, { status: 'see' }, { new: true })
          .exec();

      case 'see':
        return await this.visitModel
          .findByIdAndUpdate(id, { status: 'interest' }, { new: true })
          .exec();
      case 'interest':
        await this.visitModel.updateMany(
          { _id: { $ne: id }, status: { $ne: 'delete' } },
          { status: 'ignore' },
        );
        return await this.visitModel
          .findByIdAndUpdate(id, { status: 'finish' }, { new: true })
          .exec();
      default:
        return null;
    }
  }
  async ignoreVisit(id: string): Promise<string> {
    const visit = await this.visitModel.findById(id).exec();

    if (!visit) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }
    await this.visitModel.findByIdAndUpdate(id, { status: 'ignore' }).exec();
    return 'Visit deleted successfully';
  }
}
