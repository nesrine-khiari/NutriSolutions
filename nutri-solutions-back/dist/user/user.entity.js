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
exports.UserEntity = void 0;
const time_stamp_entity_1 = require("../common/db-utilities/time-stamp.entity");
const user_enums_1 = require("../enums/user-enums");
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity extends time_stamp_entity_1.TimeStampEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "profilePictureUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_enums_1.GenderEnum,
        default: user_enums_1.GenderEnum.MALE,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_enums_1.UserRoleEnum,
        default: user_enums_1.UserRoleEnum.CLIENT,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.TableInheritance)({
        column: { name: 'role', type: 'enum', enum: user_enums_1.UserRoleEnum },
    })
], UserEntity);
//# sourceMappingURL=user.entity.js.map