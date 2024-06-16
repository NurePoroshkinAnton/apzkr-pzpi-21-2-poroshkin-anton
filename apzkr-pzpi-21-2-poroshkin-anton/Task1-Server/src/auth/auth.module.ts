import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionSerializer } from './utils/SessionSerializer';
import { CompaniesModule } from 'src/companies/companies.module';
import { Company } from 'src/companies/entities/company.entity';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    CompaniesModule,
    JwtModule,
    ClientsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, SessionSerializer],
})
export class AuthModule {}
