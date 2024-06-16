import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from 'src/clients/clients.service';
import JwtPayload from 'src/common/types/JwtPayload';
import { CompaniesService } from 'src/companies/companies.service';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { CreateCompanyDto } from 'src/companies/dto/create-company.dto';
import { SigninDto } from './dto/signin.dto';
import { omit } from 'lodash';
import * as bcrypt from 'bcrypt';
import { GoogleJwtPayloadDto } from 'src/auth/dto/google-jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly clientsService: ClientsService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signinClient(googleJwt: string) {
    const { email, name } =
      this.jwtService.decode<GoogleJwtPayloadDto>(googleJwt);

    let client = await this.clientsService.getByEmail(email);

    if (!client) {
      const dto: CreateClientDto = {
        email,
        name: name,
        roomId: null,
      };

      client = await this.clientsService.create(dto);
    }

    return client;
  }

  async signupCompany(dto: CreateCompanyDto) {
    const password = await bcrypt.hash(dto.password, 10);
    return this.companiesService.create({ ...dto, password });
  }

  async signinCompany(dto: SigninDto) {
    const { email, password } = dto;
    const company = await this.companiesService.getByEmail(email);

    if (!company || !(await bcrypt.compare(password, company.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return company;
  }

  async getCompanyProfile(companyId: string) {
    const company = await this.companiesService.getById(companyId);
    return omit(company, ['password']);
  }

  async getClientProfile(clientId: string) {
    const client = await this.clientsService.getById(clientId);
    return omit(client, ['password']);
  }

  signJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: this.config.get<string>('ACCESS_TOKENT_EXPIRATION_TIME'),
    });
  }
}
