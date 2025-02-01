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
      .find({ status: { $ne: 'delete' } })
      .sort({ createdAt: -1 })
      .exec();
  }
  async getarchivedVisits(): Promise<VisitDocument[]> {
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

    console.log(visit.status);

    console.log(visit_status.Status);

    if (visit.status !== visit_status.Status) {
      throw new NotFoundException(
        `Der Status wurde bereits geändert. Bitte Laden Sie die Seite neu`,
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
        return await this.visitModel
          .findByIdAndUpdate(id, { status: 'finish' }, { new: true })
          .exec();
      default:
        return null;
    }
  }
}
