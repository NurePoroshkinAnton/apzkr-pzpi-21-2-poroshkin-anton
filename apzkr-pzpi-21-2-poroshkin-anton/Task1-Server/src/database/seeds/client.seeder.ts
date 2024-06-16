import { Client } from 'src/clients/entities/client.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { roomUuids } from './room.seeder';

export default class ClientSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Client);
    await repository.save(clients);
  }
}

export const clientUuids = [
  'dfced8d7-fece-4ede-8534-798562f23f92',
  '582bc2ab-e2da-4ce2-a5d1-11236eb9da83',
  'dcb0ce7b-6663-4837-b7e4-1ea934904d9d',
  'a0b8d74b-4eac-4218-b894-6110a868800c',
  'cd3fec89-bc92-4ff4-8eeb-f6f485c67d27',
  'f30fb439-e1fa-450e-8c01-f6331b2d4fd3',
  '41f5281d-81a0-4272-931f-fdf43bfcc8f6',
  '271020dc-bc03-456a-af51-652594edae1e',
  '06f2b1ad-02ab-408b-b325-7c3fa10fca7c',
  '9a3d4bd3-16f5-4b9c-856f-78903cf7e04c',
];

const clients = [
  {
    id: clientUuids[0],
    name: 'Anton Poroshkin',
    email: 'poroshkinporoshkinanton18@gmail.com',
    roomId: roomUuids[0],
  },
];
