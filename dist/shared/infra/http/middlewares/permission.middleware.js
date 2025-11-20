"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const show_user_permissions_service_1 = __importDefault(require("../../../../modules/users/services/users-permissions/show-user-permissions.service"));
const app_error_1 = __importDefault(require("../errors/app-error"));
const permissionMiddleware = (requiredPermission) => {
    return async (request, response, next) => {
        try {
            const showUserPermissionsService = tsyringe_1.container.resolve(show_user_permissions_service_1.default);
            const userPermissions = (await showUserPermissionsService.execute({ user_id: request.user_id })).at(0);
            if (!userPermissions)
                throw new app_error_1.default(404, "User permissions not found.");
            const hasPermission = userPermissions.permissions.includes(requiredPermission);
            if (!hasPermission) {
                return response.status(403).json({ message: "Insufficient permissions." });
            }
        }
        catch (error) {
            if (error instanceof app_error_1.default)
                return response.status(error.code).json({ message: error.message });
            return response.status(403).json({ message: "Insufficient permissions." });
        }
        next();
    };
};
exports.default = permissionMiddleware;
//# sourceMappingURL=permission.middleware.js.map