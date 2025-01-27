import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { jwtConstants } from 'src/common/constants/auth.constants';
import { NutritionistStatusEnum, UserRoleEnum } from 'src/enums/user-enums';
import { IS_PUBLIC_KEY } from './auth.guard';
import { extractTokenFromHeader } from 'src/common/utils/guards.utils';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  private readonly logger = new Logger(RolesGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // No roles required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      this.logger.log('JWT payload:', payload);

      // Check if the user has the required role
      const hasRole = requiredRoles.some((role) => payload.role === role);
      if (!hasRole) {
        this.logger.warn(
          `User does not have the required roles: ${requiredRoles}`,
        );
        throw new UnauthorizedException(
          'You are not authorized to access this resource',
        );
      }

      this.logger.debug('Access granted');
      return true;
    } catch (error) {
      this.logger.error('Error verifying token:', error);
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }
  }
}
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);