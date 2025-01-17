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
exports.FileUploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const uuid_1 = require("uuid");
const createFileInterceptorOptions = (destination, allowedExtensions) => ({
    storage: (0, multer_1.diskStorage)({
        destination: `./uploads/${destination}`,
        filename: (req, file, callback) => {
            const uniqueName = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
            callback(null, uniqueName);
        },
    }),
    fileFilter: (req, file, callback) => {
        if (!allowedExtensions.includes((0, path_1.extname)(file.originalname).toLowerCase())) {
            return callback(new Error(`Only ${allowedExtensions.join(', ')} files are allowed!`), false);
        }
        callback(null, true);
    },
});
let FileUploadController = class FileUploadController {
    uploadImage(image) {
        return {
            message: 'Image uploaded successfully!',
            filename: image.filename,
            path: `/uploads/images/${image.filename}`,
        };
    }
    uploadFile(file) {
        return {
            message: 'File uploaded successfully!',
            filename: file.filename,
            path: `/uploads/files/${file.filename}`,
        };
    }
};
exports.FileUploadController = FileUploadController;
__decorate([
    (0, common_1.Post)('/image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', createFileInterceptorOptions('images', ['.jpg', '.jpeg', '.png', '.gif']))),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileUploadController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('/file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', createFileInterceptorOptions('files', ['.pdf']))),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileUploadController.prototype, "uploadFile", null);
exports.FileUploadController = FileUploadController = __decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Controller)('upload')
], FileUploadController);
function isPublic() {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=upload.controller.js.map