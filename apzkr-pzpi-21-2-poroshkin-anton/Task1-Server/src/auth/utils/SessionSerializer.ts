import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { CompaniesService } from 'src/companies/companies.service';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly companiesService: CompaniesService) {
    super();
  }

  serializeUser(user: Company, done: any) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: any) {
    const user = await this.companiesService.getById(payload.id);

    if (user) {
      return done(null, user);
    }

    return done(null, null);
  }
}
