import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/type/role';

export const ROLES_KEY = 'role';
export const RequireRoles = (...role: Role[]) => SetMetadata(ROLES_KEY, role);