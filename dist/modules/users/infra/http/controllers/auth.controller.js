"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const create_user_and_vinculate_user_permissions_service_1 = __importDefault(require("../../../services/user/create-user-and-vinculate-user-permissions.service"));
const create_user_session_service_1 = __importDefault(require("../../../services/user/create-user-session.service"));
class AuthController {
    async signUp(request, response) {
        const createUserAndVinculateUserPermissionsService = tsyringe_1.container.resolve(create_user_and_vinculate_user_permissions_service_1.default);
        const createUser = await createUserAndVinculateUserPermissionsService.execute(request.body);
        return response.status(201).json(createUser);
    }
    async signIn(request, response) {
        const createUserSessionService = tsyringe_1.container.resolve(create_user_session_service_1.default);
        const userSession = await createUserSessionService.execute(request.body.email, request.body.password);
        return response.status(200).json(userSession);
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map