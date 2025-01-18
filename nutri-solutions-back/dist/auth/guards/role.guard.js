"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RolesGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const guards_utils_1 = require("../../common/utils/guards.utils");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let RolesGuard = RolesGuard_1 = class RolesGuard {
    constructor(reflector, jwtService, configService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(RolesGuard_1.name);
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.get(exports.ROLES_KEY, context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = (0, guards_utils_1.extractTokenFromHeader)(request);
        if (!token) {
            throw new common_1.UnauthorizedException('You are not authorized to access this resource');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            this.logger.log(payload);
            return requiredRoles.some((role) => payload.role === role);
        }
        catch {
            throw new common_1.UnauthorizedException('You are not authorized to access this resource');
        }
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = RolesGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        config_1.ConfigService])
], RolesGuard);
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=role.guard.js.map