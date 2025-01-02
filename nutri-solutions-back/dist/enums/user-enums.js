"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionistStatusEnum = exports.UserRoleEnum = exports.GenderEnum = void 0;
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "homme";
    GenderEnum["FEMALE"] = "femme";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));
var UserRoleEnum;
(function (UserRoleEnum) {
    UserRoleEnum["CLIENT"] = "Client";
    UserRoleEnum["NUTRITIONIST"] = "Nutritionist";
    UserRoleEnum["ADMIN"] = "Admin";
})(UserRoleEnum || (exports.UserRoleEnum = UserRoleEnum = {}));
var NutritionistStatusEnum;
(function (NutritionistStatusEnum) {
    NutritionistStatusEnum["APPROVED"] = "Approuv\u00E9";
    NutritionistStatusEnum["REJECTED"] = "Rejet\u00E9";
    NutritionistStatusEnum["WAITING"] = "En attente";
})(NutritionistStatusEnum || (exports.NutritionistStatusEnum = NutritionistStatusEnum = {}));
//# sourceMappingURL=user-enums.js.map