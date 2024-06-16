import { PartialType } from '@nestjs/mapped-types';
import { CreateClimateDeviceDto } from './create-climate-device.dto';
import { ClimateDeviceStatus } from 'src/climate-profiles/entities/climate-profile.entity';

export class UpdateClimateDeviceDto extends PartialType(
  CreateClimateDeviceDto,
) {
  status: ClimateDeviceStatus;
}
