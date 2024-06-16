import { Injectable } from '@nestjs/common';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  getById(id: string) {
    return this.companyRepo.findOneBy({ id });
  }

  getByEmail(email: string) {
    return this.companyRepo.findOneBy({ email });
  }

  create(dto: CreateCompanyDto) {
    const newCompany = this.companyRepo.create(dto);
    return this.companyRepo.save(newCompany);
  }

  async update(id: string, dto: UpdateCompanyDto) {
    await this.companyRepo.update(id, dto);
    return this.getById(id);
  }
}
