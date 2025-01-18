"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTokenFromHeader = extractTokenFromHeader;
function extractTokenFromHeader(request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}
//# sourceMappingURL=guards.utils.js.map