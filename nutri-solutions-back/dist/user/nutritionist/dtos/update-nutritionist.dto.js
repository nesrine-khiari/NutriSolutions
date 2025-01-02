"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNutritionistDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_nutritionist_dto_1 = require("./create-nutritionist.dto");
class UpdateNutritionistDto extends (0, mapped_types_1.PartialType)(create_nutritionist_dto_1.CreateNutritionistDto) {
}
exports.UpdateNutritionistDto = UpdateNutritionistDto;
//# sourceMappingURL=update-nutritionist.dto.js.map