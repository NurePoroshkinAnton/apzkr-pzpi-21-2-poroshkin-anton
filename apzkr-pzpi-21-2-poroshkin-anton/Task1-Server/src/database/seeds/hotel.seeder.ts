import { Hotel } from 'src/hotels/entities/hotel.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { companyUuid } from './company.seeder';

export default class HotelSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Hotel);
    await repository.save(hotels);
  }
}

const hotels = [
  {
    id: '6c85c98a-d8a8-40ad-ae74-b316f846db73',
    name: 'Marriott Grand Palace',
    address: '123 Main Street, New York, NY 10001',
    companyId: companyUuid,
  },
];

export const hotelUuids = hotels.map((hotel) => hotel.id);
