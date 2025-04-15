import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

export function Auth(...roles: Role[]) {
    return applyDecorators(
        SkipThrottle(),
        Roles(...roles),
        UseGuards(AuthGuard, RolesGuard),
        Throttle({ api: { limit: 100, ttl: 60000 } })
    );
}
