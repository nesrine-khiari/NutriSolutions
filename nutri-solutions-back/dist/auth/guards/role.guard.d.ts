import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from 'src/enums/user-enums';
export declare class RoleGuard implements CanActivate {
    private reflector;
    private role;
    jwtService: any;
    constructor(reflector: Reflector, role: UserRoleEnum);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
