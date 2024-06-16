import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { AccessTokenGuard } from 'src/common/guards/AccessTokenGuard';
import { Role } from 'src/auth/types/Role';
import { Request } from 'express';
import JwtPayload from 'src/common/types/JwtPayload';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('stats')
@ApiBearerAuth()
@Controller('stats')
@UseGuards(AccessTokenGuard(Role.Company))
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('climate-devices')
  async getClimateDeviceStats(@Req() request: Request) {
    const payload = request.user as JwtPayload;
    return this.statsService.getClimateDeviceStats(payload.sub);
  }

  @Get('climate-devices/hotel/:hotelId')
  async getClimateDeviceStatsForHotel(@Param('hotelId') hotelId: string) {
    return this.statsService.getClimateDeviceStatisticsForHotel(hotelId);
  }

  @Get('manufacturers')
  async getManufacturerStats(@Req() request: Request) {
    const payload = request.user as JwtPayload;
    return this.statsService.getManufacturerStatistics(payload.sub);
  }
}
