import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { jwtConstants } from 'src/common/constants/auth.constants';
import { UserRoleEnum } from 'src/enums/user-enums';
import { IS_PUBLIC_KEY } from './auth.guard';
import { extractTokenFromHeader } from 'src/common/utils/guards.utils';

@Injectable()
export class RoleGuard implements CanActivate {
  jwtService: any;
  constructor(
    private reflector: Reflector,
    private role: UserRoleEnum,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      if (payload.role !== this.role) {
        throw new UnauthorizedException();
      }
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
