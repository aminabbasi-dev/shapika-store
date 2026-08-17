import { UserRole } from 'src/common/enums/user-role.enum';

export interface Payload {
  sub: string;
  email: string;
  role: UserRole;
}
