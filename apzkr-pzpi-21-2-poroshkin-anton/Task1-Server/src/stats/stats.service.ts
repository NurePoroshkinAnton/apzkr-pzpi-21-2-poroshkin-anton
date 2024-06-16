import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClimateDevice } from 'src/climate-devices/entities/climate-device.entity';
import { ClimateDeviceStatus } from 'src/climate-profiles/entities/climate-profile.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Repository, In } from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(ClimateDevice)
    private readonly climateDeviceRepo: Repository<ClimateDevice>,
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>,
    @InjectRepository(Hotel)
    private readonly hotelRepo: Repository<Hotel>,
  ) {}

  async getClimateDeviceStats(companyId: string) {
    const roomIds = await this.getRoomIdsByCompany(companyId);

    const total = await this.climateDeviceRepo.count({
      where: { roomId: In(roomIds) },
    });

    const statuses = await this.climateDeviceRepo
      .createQueryBuilder('climateDevice')
      .select('climateDevice.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('climateDevice.roomId IN (:...roomIds)', { roomIds })
      .groupBy('climateDevice.status')
      .getRawMany();

    const groups = statuses.map((status) => {
      const count = parseInt(status.count, 10);
      return {
        status: status.status.toLowerCase(),
        count,
        percentage: Math.round((count / total) * 100),
      };
    });

    return {
      total,
      groups,
    };
  }

  async getManufacturerStatistics(companyId: string) {
    const roomIds = await this.getRoomIdsByCompany(companyId);

    const warningCounts = await this.countDevicesByStatusAndManufacturer(
      ClimateDeviceStatus.Warning,
      roomIds,
    );
    const errorCounts = await this.countDevicesByStatusAndManufacturer(
      ClimateDeviceStatus.Error,
      roomIds,
    );

    const warningMap = new Map<string, number>();
    const errorMap = new Map<string, number>();

    warningCounts.forEach(({ manufacturer, count }) => {
      warningMap.set(manufacturer, parseInt(count, 10));
    });

    errorCounts.forEach(({ manufacturer, count }) => {
      errorMap.set(manufacturer, parseInt(count, 10));
    });

    const manufacturers = new Set([...warningMap.keys(), ...errorMap.keys()]);

    const results = Array.from(manufacturers).map((manufacturer) => ({
      manufacturer,
      warningCount: warningMap.get(manufacturer) || 0,
      errorCount: errorMap.get(manufacturer) || 0,
    }));

    results.sort((a, b) => {
      if (b.errorCount !== a.errorCount) {
        return b.errorCount - a.errorCount;
      }

      return b.warningCount - a.warningCount;
    });

    return results;
  }

  async getClimateDeviceStatisticsForHotel(hotelId: string) {
    const rooms = await this.roomRepo.find({ where: { hotelId } });
    const roomIds = rooms.map((room) => room.id);

    const total = await this.climateDeviceRepo.count({
      where: { roomId: In(roomIds) },
    });

    const statuses = await this.climateDeviceRepo
      .createQueryBuilder('climateDevice')
      .select('climateDevice.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('climateDevice.roomId IN (:...roomIds)', { roomIds })
      .groupBy('climateDevice.status')
      .getRawMany();

    const groups = statuses.map((status) => {
      const count = parseInt(status.count, 10);
      return {
        status: status.status.toLowerCase(),
        count,
        percentage: Math.round((count / total) * 100),
      };
    });

    return {
      total,
      groups,
    };
  }

  private async getHotelIdsByCompany(companyId: string) {
    const hotels = await this.hotelRepo.findBy({ companyId });
    return hotels.map((hotel) => hotel.id);
  }

  private async getRoomIdsByCompany(companyId: string) {
    const hotelsIds = await this.getHotelIdsByCompany(companyId);

    const rooms = await this.roomRepo.findBy({ hotelId: In(hotelsIds) });
    const roomIds = rooms.map((room) => room.id);

    return roomIds;
  }

  private async countDevicesByStatusAndManufacturer(
    status: ClimateDeviceStatus,
    roomIds: string[],
  ) {
    return this.climateDeviceRepo
      .createQueryBuilder('climateDevice')
      .select('climateDevice.manufacturer', 'manufacturer')
      .where('climateDevice.roomId IN (:...roomIds)', { roomIds })
      .addSelect('COUNT(*)', 'count')
      .where('climateDevice.status = :status', {
        status,
      })
      .groupBy('climateDevice.manufacturer')
      .getRawMany();
  }
}
