"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const show_users_service_1 = __importDefault(require("../../../services/user/show-users.service"));
const tsyringe_1 = require("tsyringe");
const update_user_permissions_service_1 = __importDefault(require("../../../services/users-permissions/update-user-permissions.service"));
class UserController {
    async show(request, response) {
        const showUsersService = tsyringe_1.container.resolve(show_users_service_1.default);
        const showUsers = await showUsersService.execute(request.query);
        return response.status(200).json(showUsers);
    }
    async updateUserPermissions(request, response) {
        const id = String(request.params.id);
        const updateUserPermissionsService = tsyringe_1.container.resolve(update_user_permissions_service_1.default);
        await updateUserPermissionsService.execute(id, request.body);
        return response.status(200).send();
    }
    async me(request, response) {
        const userId = String(request.user_id);
        const showUsersService = tsyringe_1.container.resolve(show_users_service_1.default);
        const showUser = await showUsersService.execute({ id: userId });
        return response.status(200).json(showUser);
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map