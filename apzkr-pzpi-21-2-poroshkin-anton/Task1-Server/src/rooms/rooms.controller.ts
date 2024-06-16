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
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AccessTokenGuard } from 'src/common/guards/AccessTokenGuard';
import { SetProfileActiveDto } from './dto/set-profile-active.dto';
import { Role } from 'src/auth/types/Role';

@ApiTags('rooms')
@ApiBearerAuth()
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('active-profile')
  getActiveProfile(@Query('roomId') roomId: string) {
    return this.roomsService.getActiveProfile(roomId);
  }

  @Post('set-active-profile')
  @HttpCode(200)
  setActiveProfile(@Body() dto: SetProfileActiveDto) {
    return this.roomsService.setActiveProfile(dto);
  }

  @Get('/number-by-id')
  getNumberById(@Query('roomId') roomId: string) {
    return this.roomsService.getNumberById(roomId);
  }

  @UseGuards(AccessTokenGuard(Role.Company))
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @UseGuards(AccessTokenGuard(Role.Company))
  @Get()
  getAll(@Query('hotelId') hotelId: string) {
    return this.roomsService.getAll(hotelId);
  }

  @UseGuards(AccessTokenGuard(Role.Company))
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.roomsService.getById(id);
  }

  @UseGuards(AccessTokenGuard(Role.Company))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @UseGuards(AccessTokenGuard(Role.Company))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
