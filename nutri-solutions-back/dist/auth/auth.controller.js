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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signin_dto_1 = require("./dtos/signin.dto");
const auth_guard_1 = require("./guards/auth.guard");
const create_user_dto_1 = require("../user/dtos/create-user.dto");
const client_service_1 = require("../user/client/client.service");
const nutritionist_service_1 = require("../user/nutritionist/nutritionist.service");
const user_enums_1 = require("../enums/user-enums");
let AuthController = class AuthController {
    constructor(authService, clientService, nutritionistService) {
        this.authService = authService;
        this.clientService = clientService;
        this.nutritionistService = nutritionistService;
    }
    async login(signInDto) {
        const user = await this.authService.validateUser(signInDto.email, signInDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        return this.authService.login(user);
    }
    async signup(signupDto) {
        let user;
        switch (signupDto.role) {
            case user_enums_1.UserRoleEnum.CLIENT:
                user = await this.clientService.create(signupDto);
                break;
            case user_enums_1.UserRoleEnum.NUTRITIONIST:
                user = await this.nutritionistService.create(signupDto);
                break;
            default:
                throw new Error('Invalid user type');
        }
        return this.authService.login(user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
exports.AuthController = AuthController = __decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        client_service_1.ClientService,
        nutritionist_service_1.NutritionistService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map