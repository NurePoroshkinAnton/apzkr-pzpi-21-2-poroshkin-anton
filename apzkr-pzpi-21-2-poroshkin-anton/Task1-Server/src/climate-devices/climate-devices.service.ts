import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClimateDevice } from './entities/climate-device.entity';
import { Repository } from 'typeorm';
import { CreateClimateDeviceDto } from './dto/create-climate-device.dto';
import { UpdateClimateDeviceDto } from './dto/update-climate-device.dto';

@Injectable()
export class ClimateDevicesService {
  constructor(
    @InjectRepository(ClimateDevice)
    private climateDeviceRepo: Repository<ClimateDevice>,
  ) {}

  async getByRoom(roomId: string): Promise<ClimateDevice[]> {
    return this.climateDeviceRepo.find({
      where: {
        roomId,
      },

      relations: {
        room: true,
      },
    });
  }

  async getById(id: string): Promise<ClimateDevice> {
    return this.climateDeviceRepo.findOneBy({ id });
  }

  async create(dto: CreateClimateDeviceDto): Promise<ClimateDevice> {
    const device = this.climateDeviceRepo.create(dto);
    return this.climateDeviceRepo.save(device);
  }

  async update(
    id: string,
    dto: UpdateClimateDeviceDto,
  ): Promise<ClimateDevice> {
    await this.climateDeviceRepo.update(id, dto);
    return this.getById(id);
  }

  async remove(id: string): Promise<void> {
    await this.climateDeviceRepo.delete(id);
  }
}
