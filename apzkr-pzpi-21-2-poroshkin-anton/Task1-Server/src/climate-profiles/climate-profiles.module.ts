import { Module } from '@nestjs/common';
import { ClimateProfilesService } from './climate-profiles.service';
import { ClimateProfilesController } from './climate-profiles.controller';
import { ClimateProfile } from './entities/climate-profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClimateProfile]), ClientsModule],
  controllers: [ClimateProfilesController],
  providers: [ClimateProfilesService],
  exports: [ClimateProfilesService],
})
export class ClimateProfilesModule {}
