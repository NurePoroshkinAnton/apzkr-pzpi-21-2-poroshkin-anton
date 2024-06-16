import { randint } from 'src/utils/randint';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import {
  ClimateDevice,
  ClimateDeviceStatus,
  ClimateDeviceType,
} from 'src/climate-devices/entities/climate-device.entity';
import { roomUuids } from './room.seeder';

export default class ClimateDeviceSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ClimateDevice);
    await repository.save(climateDevices);
  }
}

export const climateDeviceUuids = [
  'd41c297a-230a-4407-8137-39b1bc585b1a',
  '5a0f535b-8972-4ccb-b469-ece8dae59f88',
  '171aa97e-f4e6-4af5-b096-7bb3a5dd230a',
  'a4e606bd-d31d-456f-812b-0b3109844d5d',
  '3d1fc872-0d6b-474a-8c0b-cd582f399403',
  '9862a74d-bb9d-48e7-8bcb-157bda57a8b0',
  '1136a248-18a1-4e45-bad1-800de1f7341a',
  '6ec7a861-584c-48c3-9e07-0266b61667ab',
  'e815ffe8-f45a-4332-9f90-a123833a7bf1',
  'e58def2e-abc8-4583-b84d-54855b6f9426',
  '4b0cdc14-26e2-4d35-b7e5-d5fb94eb471d',
  'f183a48b-b8a1-40a8-979a-1d53f361a9d6',
  'b2fb770b-47e5-4429-87cf-88de7c888e31',
  'e6a7c1c2-3558-4499-a56d-fa9806d3e26f',
  '26b44edf-ed79-4028-b0e4-a439898a901f',
  '0dbc42cf-1654-4cce-ae02-5f73795a405a',
  'f51b502e-7806-49bd-8d50-634834afc446',
  'fbdb65b2-c3f2-4c2d-80fc-2309252057c5',
  'bd58a5a4-8b6e-4ad7-a4b1-ea2a4709e0d0',
  'daa8d65e-6227-41c6-916d-ac49f6d51467',
  'c87cb509-95a8-4580-b4a1-31fc57a16612',
  '0a86a7aa-1285-4f32-9597-f3c27d70a245',
  '4183e70b-06cd-49c5-8a2a-be2fa30748f1',
];

export const climateDeviceManufacturers = [
  'Carrier Corporation',
  'Trane Technologies',
  'Daikin Industries',
  'Honeywell',
  'Johnson Controls',
];

const climateDevices = climateDeviceUuids.map((id, index) => ({
  type:
    index % 2 === 0
      ? ClimateDeviceType.Thermostat
      : ClimateDeviceType.Humidistat,
  id,
  address: `192.107.08.${randint(100, 200)}`,
  accessionNumber: `${randint(0, 10000)}`,
  manufacturer:
    climateDeviceManufacturers[
      randint(0, climateDeviceManufacturers.length - 1)
    ],
  status: Object.values(ClimateDeviceStatus)[randint(0, 2)],
  roomId: roomUuids[randint(0, roomUuids.length - 1)],
}));
