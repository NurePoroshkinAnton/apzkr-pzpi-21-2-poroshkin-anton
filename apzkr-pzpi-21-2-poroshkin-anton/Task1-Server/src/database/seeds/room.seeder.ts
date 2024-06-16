import { Room } from 'src/rooms/entities/room.entity';
import { randint } from 'src/utils/randint';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { hotelUuids } from './hotel.seeder';

export default class RoomSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Room);
    await repository.save(rooms);
  }
}

export const roomUuids = [
  'd06f7eca-c677-46d8-a059-01f2e9a7c7f2',
  'ef9a8ae8-64af-4c97-86c4-53ca09d4e60d',
  'b8de313c-3c4d-4b7f-b685-b4ef25417f05',
  '98a98298-bbcd-40a0-93c5-c08fd7321bb8',
  '725041ca-3c5c-42e5-86fa-094113439b72',
];

const rooms = roomUuids.map((id) => ({
  id,
  number: randint(100, 500),
  hotelId: hotelUuids[randint(0, hotelUuids.length - 1)],
}));
