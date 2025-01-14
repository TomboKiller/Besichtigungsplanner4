import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateVisitDto } from 'src/api/request.dto';
import { GetVisitResponseDto } from 'src/api/response.dto';
import { VisitsService } from './visits.service';
import { VisitDocument } from './visits.entity';

@Controller('api/v1/visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  async createVisit(
    @Body() createVisitDto: CreateVisitDto,
  ): Promise<GetVisitResponseDto> {
    const newVisit = await this.visitsService.createVisit(createVisitDto);
    return this.mapVisitToResponse(newVisit);
  }

  @Get()
  async getVisits(): Promise<GetVisitResponseDto[]> {
    const visits = await this.visitsService.getVisits();
    return visits.map((visit) => this.mapVisitToResponse(visit));
  }

  @Get('/archived')
  async getdeletedVisits(): Promise<GetVisitResponseDto[]> {
    const visits = await this.visitsService.getarchivedVisits();
    return visits.map((visit) => this.mapVisitToResponse(visit));
  }

  @Delete('/:id')
  async deleteVisit(@Param('id') id: string): Promise<string> {
    return await this.visitsService.deleteVisit(id);
  }

  @Patch('/:id')
  async updateVisit(
    @Param('id') id: string,
    @Body() updateVisitDto: CreateVisitDto,
  ): Promise<GetVisitResponseDto> {
    const updatedVisit = await this.visitsService.updateVisit(
      id,
      updateVisitDto,
    );
    return this.mapVisitToResponse(updatedVisit);
  }

  mapVisitToResponse(visit: VisitDocument): GetVisitResponseDto {
    return {
      id: visit._id.toString(),
      name: visit.name,
      datetime: visit.datetime?.toISOString(),
      numberOfPeople: visit.numberOfPeople,
      pets: visit.pets,
      jobTitle: visit.jobTitle,
      other: visit.other,
      status: visit.status,
      createdAt: visit.createdAt.toISOString(),
    };
  }
}
