import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ClimateDevicesService } from './climate-devices.service';
import { CreateClimateDeviceDto } from './dto/create-climate-device.dto';
import { UpdateClimateDeviceDto } from './dto/update-climate-device.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/AccessTokenGuard';
import { Role } from 'src/auth/types/Role';
import { unitsConfig } from 'src/common/config/unitsConfig';

@ApiTags('climate-devices')
@ApiBearerAuth()
@Controller('climate-devices')
export class ClimateDevicesController {
  constructor(private readonly climateDeviceService: ClimateDevicesService) {}
  @Get('/units-config')
  getUnitsConfig() {
    return unitsConfig;
  }

  @UseGuards(AccessTokenGuard(Role.Company))
  @Post()
  create(@Body() createClimateDeviceDto: CreateClimateDeviceDto) {
    return this.climateDeviceService.create(createClimateDeviceDto);
  }

  @Get()
  getByRoom(@Query('roomId') roomId: string) {
    return this.climateDeviceService.getByRoom(roomId);
  }

  @UseGuards(AccessTokenGuard(Role.Company))
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.climateDeviceService.getById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClimateDeviceDto: UpdateClimateDeviceDto,
  ) {
    return this.climateDeviceService.update(id, updateClimateDeviceDto);
  }

  @UseGuards(AccessTokenGuard(Role.Company))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.climateDeviceService.remove(id);
  }
}
