import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room } from './entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClimateProfilesModule } from 'src/climate-profiles/climate-profiles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), ClimateProfilesModule],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
