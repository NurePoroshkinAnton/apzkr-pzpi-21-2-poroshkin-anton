import { ClimateProfile } from 'src/climate-profiles/entities/climate-profile.entity';
import { randint } from 'src/utils/randint';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { clientUuids } from './client.seeder';

export default class ClimateProfileSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ClimateProfile);
    await repository.save(climateProfiles);
  }
}

export const climateProfileUuids = [
  '112c7127-01de-4205-908e-503616739c51',
  '0b378dfa-9643-41d3-aef3-f70e6d44e3e6',
  '28522c6c-dbc2-45cc-a4ed-aadc5978ed64',
  'c45bec11-5c93-4a3e-9262-c8eb5769ec72',
  'd6dd3712-cbef-4dda-95b0-fe19062c8e79',
  '606e7332-b668-48e1-95eb-5afca0888572',
  '473e0b8b-26e1-42d5-9d1c-006b01ea7b17',
  '228fa3ef-149a-4946-bd66-20a90e59e090',
  '5ec1f387-ae52-445f-8300-de9cd2c15f08',
  '82890379-3c38-4967-bb23-7c00a4c42790',
];

const climateProfiles = climateProfileUuids.map((id, index) => ({
  id,
  name: `Profile ${index}`,
  temperature: randint(18, 25),
  humidity: randint(30, 50),
  isActive: index === 0,
  clientId: clientUuids[0],
}));
