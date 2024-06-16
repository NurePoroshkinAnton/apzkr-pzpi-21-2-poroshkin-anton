import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { ClimateProfile } from 'src/climate-profiles/entities/climate-profile.entity';
import { ClimateProfilesService } from 'src/climate-profiles/climate-profiles.service';
import { SetProfileActiveDto } from './dto/set-profile-active.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>,
    private readonly climateProfilesService: ClimateProfilesService,
  ) {}

  async getAll(hotelId: string): Promise<Room[]> {
    return this.roomRepo.find({
      where: {
        hotelId,
      },

      relations: {
        clients: true,
        hotel: true,
        climateDevices: true,
      },
    });
  }

  async getById(id: string): Promise<Room> {
    return this.roomRepo.findOne({
      where: {
        id,
      },

      relations: {
        clients: true,
      },
    });
  }

  async getActiveProfile(roomId: string) {
    const room = await this.getById(roomId);

    if (!room) {
      return null;
    }

    let profile: ClimateProfile | null = null;

    for (const client of room.clients) {
      const activeProfile =
        await this.climateProfilesService.getActiveProfileForClient(client.id);

      if (activeProfile) {
        profile = activeProfile;
        break;
      }
    }

    return profile;
  }

  async setActiveProfile(setProfileActiveDto: SetProfileActiveDto) {
    const { roomId, profileId, isActive } = setProfileActiveDto;

    if (!roomId) {
      Logger.log('No room id');
      return this.climateProfilesService.update(profileId, { isActive });
    }

    const room = await this.roomRepo.findOne({
      where: { id: roomId },
      relations: {
        clients: {
          climateProfiles: true,
        },
      },
    });

    if (!room) {
      throw new NotFoundException('Room with given id does not exist');
    }

    if (isActive) {
      const activeProfile = await this.getActiveProfile(roomId);

      Logger.log(activeProfile);

      if (activeProfile) {
        await this.climateProfilesService.update(activeProfile.id, {
          isActive: false,
        });
      }
    }

    return this.climateProfilesService.update(profileId, { isActive });
  }

  async create(dto: CreateRoomDto): Promise<Room> {
    const hotel = this.roomRepo.create(dto);
    return this.roomRepo.save(hotel);
  }

  async update(id: string, dto: UpdateRoomDto): Promise<Room> {
    await this.roomRepo.update(id, dto);
    return this.getById(id);
  }

  async remove(id: string): Promise<void> {
    await this.roomRepo.delete(id);
  }

  async getNumberById(id: string) {
    const room = await this.roomRepo.findOneBy({ id });
    return room.number;
  }
}
