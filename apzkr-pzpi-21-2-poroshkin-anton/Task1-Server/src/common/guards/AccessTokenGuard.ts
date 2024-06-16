import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role } from 'src/auth/types/Role';
import JwtPayload from '../types/JwtPayload';

export function AccessTokenGuard(role: Role | null = null) {
  class RoleGuardMixin implements CanActivate {
    constructor(
      @Inject(JwtService)
      readonly jwtService: JwtService,
      readonly configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      let payload = {} as JwtPayload;

      if (!token) {
        throw new UnauthorizedException();
      }

      try {
        payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
        });

        request['user'] = payload;
      } catch (e) {
        console.error(e);
        throw new UnauthorizedException();
      }

      if (role && payload.role !== role) {
        throw new ForbiddenException();
      }

      return true;
    }

    extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }

  const guard = mixin(RoleGuardMixin);
  return guard;
}
