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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_constants_1 = require("../../common/constants/auth.constants");
const user_enums_1 = require("../../enums/user-enums");
const guards_utils_1 = require("../../common/utils/guards.utils");
let RoleGuard = class RoleGuard {
    constructor(reflector, role) {
        this.reflector = reflector;
        this.role = role;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = (0, guards_utils_1.extractTokenFromHeader)(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret,
            });
            if (payload.role !== this.role) {
                throw new common_1.UnauthorizedException();
            }
            request['user'] = payload;
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, String])
], RoleGuard);
//# sourceMappingURL=role.guard.js.map