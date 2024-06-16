import { Role } from 'src/auth/types/Role';

export default interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}
