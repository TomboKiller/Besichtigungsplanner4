import { Controller, Post, Body } from '@nestjs/common';
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
