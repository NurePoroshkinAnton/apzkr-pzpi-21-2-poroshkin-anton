import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { AccessTokenGuard } from 'src/common/guards/AccessTokenGuard';
import { Request } from 'express';
import JwtPayload from 'src/common/types/JwtPayload';
import { Role } from 'src/auth/types/Role';

@ApiTags('hotels')
@ApiBearerAuth()
@Controller('hotels')
@UseGuards(AccessTokenGuard(Role.Company))
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto, @Req() req: Request) {
    const payload = req.user as JwtPayload;
    return this.hotelsService.create(createHotelDto, payload.sub);
  }

  @Get()
  getAll(@Req() req: Request) {
    const payload = req.user as JwtPayload;
    return this.hotelsService.getAll(payload.sub);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.hotelsService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(id);
  }
}
