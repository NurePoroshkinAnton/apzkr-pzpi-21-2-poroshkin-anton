import { Module } from '@nestjs/common';
import { ClimateDevicesService } from './climate-devices.service';
import { ClimateDevicesController } from './climate-devices.controller';
import { ClimateDevice } from './entities/climate-device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClimateDevice])],
  controllers: [ClimateDevicesController],
  providers: [ClimateDevicesService],
})
export class ClimateDevicesModule {}
