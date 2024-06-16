import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClimateDevice } from 'src/climate-devices/entities/climate-device.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClimateDevice, Room, Hotel])],
  providers: [StatsService],
  controllers: [StatsController],
})
export class StatsModule {}
