import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private jwtService;
    private configService;
    constructor(reflector: Reflector, jwtService: JwtService, configService: ConfigService);
    private readonly logger;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: string[]) => import("@nestjs/common").CustomDecorator<string>;
