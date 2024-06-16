import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import JwtPayload from 'src/common/types/JwtPayload';
import { Role } from './types/Role';
import { SigninDto } from './dto/signin.dto';
import { SignupComapnyDto } from './dto/signup-company.dto';
import { AccessTokenGuard } from 'src/common/guards/AccessTokenGuard';
import { AccessTokenDto } from 'src/auth/dto/access-token.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin/google')
  async signinUser(@Body() googleJwt: AccessTokenDto) {
    if (!googleJwt) {
      throw new UnauthorizedException('Missing google JWT');
    }

    const client = await this.authService.signinClient(googleJwt.accessToken);
    const payload = {
      sub: client.id,
      email: client.email,
      role: Role.Client,
    };

    const accessToken = this.authService.signJwt(payload);
    return { accessToken };
  }

  @Post('signup/company')
  async signupCompany(@Body() dto: SignupComapnyDto) {
    const company = await this.authService.signupCompany(dto);
    const accessToken = this.authService.signJwt({
      sub: company.id,
      email: company.email,
      role: Role.Company,
    });

    return { accessToken };
  }

  @HttpCode(200)
  @Post('signin/company')
  async signinCompany(@Body() dto: SigninDto) {
    const company = await this.authService.signinCompany(dto);
    const accessToken = this.authService.signJwt({
      sub: company.id,
      email: company.email,
      role: Role.Company,
    });

    return { accessToken };
  }

  @UseGuards(AccessTokenGuard(Role.Company))
  @Get('profile/company')
  getCompanyProfile(@Req() request: Request) {
    const payload = request.user as JwtPayload;
    return this.authService.getCompanyProfile(payload.sub);
  }

  @UseGuards(AccessTokenGuard(Role.Client))
  @Get('profile/client')
  getClientProfile(@Req() request: Request) {
    const payload = request.user as JwtPayload;
    return this.authService.getClientProfile(payload.sub);
  }
}
