import { PartialType } from '@nestjs/mapped-types';
import { CreateClimateProfileDto } from './create-climate-profile.dto';

export class UpdateClimateProfileDto extends PartialType(
  CreateClimateProfileDto,
) {
  isActive: boolean;
}
