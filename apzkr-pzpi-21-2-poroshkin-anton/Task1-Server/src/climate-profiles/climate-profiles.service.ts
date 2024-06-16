import { Injectable } from '@nestjs/common';
import { CreateClimateProfileDto } from './dto/create-climate-profile.dto';
import { UpdateClimateProfileDto } from './dto/update-climate-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClimateProfile } from './entities/climate-profile.entity';
import { In, Repository } from 'typeorm';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class ClimateProfilesService {
  constructor(
    @InjectRepository(ClimateProfile)
    private readonly climateProfileRepo: Repository<ClimateProfile>,
    private readonly clientsService: ClientsService,
  ) {}

  async getAll(clientId: string): Promise<ClimateProfile[]> {
    return this.climateProfileRepo.find({
      where: {
        clientId,
      },

      relations: {
        client: true,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getById(id: string): Promise<ClimateProfile> {
    return this.climateProfileRepo.findOne({
      where: {
        id,
      },

      relations: {
        client: true,
      },
    });
  }

  async create(
    dto: CreateClimateProfileDto,
    clientId: string,
  ): Promise<ClimateProfile> {
    const climateProfile = this.climateProfileRepo.create({ ...dto, clientId });
    return this.climateProfileRepo.save(climateProfile);
  }

  getActiveProfileForClient(clientId: string): Promise<ClimateProfile | null> {
    return this.climateProfileRepo.findOne({
      where: {
        clientId,
        isActive: true,
      },
    });
  }

  async setProfileStatus(profileId: string, isActive: boolean) {
    await this.climateProfileRepo.update(profileId, { isActive });

    if (isActive) {
      const profile = await this.getById(profileId);
      const client = profile.client;
      const roomClients = await this.clientsService.getAllByRoom(
        client.roomId,
        [client.id],
      );

      this.climateProfileRepo.update(
        { clientId: In(roomClients.map((client) => client.id)) },
        { isActive: false },
      );
    }

    return this.getById(profileId);
  }

  async update(
    id: string,
    dto: UpdateClimateProfileDto,
  ): Promise<ClimateProfile> {
    await this.climateProfileRepo.update(id, dto);
    return this.getById(id);
  }

  async remove(id: string): Promise<void> {
    await this.climateProfileRepo.delete(id);
  }
}
