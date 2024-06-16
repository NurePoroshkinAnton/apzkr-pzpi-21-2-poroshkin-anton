import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { datasourceOptions } from './data-source';
import ComapnySeeder from './seeds/company.seeder';
import HotelSeeder from './seeds/hotel.seeder';
import RoomSeeder from './seeds/room.seeder';
import ClimateDeviceSeeder from './seeds/climate-device.seeder';
import ClientSeeder from './seeds/client.seeder';
import ClimateProfileSeeder from './seeds/climate-profile.seeder';

async function seed() {
  const dataSource = new DataSource(datasourceOptions);
  await dataSource.initialize();

  await runSeeders(dataSource, {
    seeds: [
      ComapnySeeder,
      HotelSeeder,
      RoomSeeder,
      ClimateDeviceSeeder,
      ClientSeeder,
      ClimateProfileSeeder,
    ],
  });
}

seed();
