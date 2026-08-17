import { UserRole } from 'src/common/enums/user-role.enum';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}
