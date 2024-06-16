import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';

export default class ComapnySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Company);
    await repository.save(companies);
  }
}

const companies = [
  {
    id: '6aef370c-eb00-4e64-9cb9-2f7b0b07da0e',
    name: 'Grand Horizon Inn',
    email: 'apz.climatly@gmail.com',
    password: '$2a$10$lmDh3UNUV26FLfgh4t0NPeSdePEUgL2VJ/o67npuiycNQDLxnbV7m',
  },
];

export const companyUuid = '6aef370c-eb00-4e64-9cb9-2f7b0b07da0e';
