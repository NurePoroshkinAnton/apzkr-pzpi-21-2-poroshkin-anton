import { Injectable } from '@nestjs/common';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepo: Repository<Hotel>,
  ) {}

  getAll(companyId: string) {
    return this.hotelRepo.find({
      where: {
        companyId,
      },

      relations: {
        rooms: true,
      },
    });
  }

  getById(id: string) {
    return this.hotelRepo.findOneBy({ id });
  }

  create(dto: CreateHotelDto, companyId: string) {
    const newCompany = this.hotelRepo.create({ ...dto, companyId });
    return this.hotelRepo.save(newCompany);
  }

  async update(id: string, dto: UpdateHotelDto) {
    await this.hotelRepo.update(id, dto);
    return this.getById(id);
  }

  async remove(id: string) {
    const hotel = await this.getById(id);
    await this.hotelRepo.delete(id);
    return hotel;
  }
}
