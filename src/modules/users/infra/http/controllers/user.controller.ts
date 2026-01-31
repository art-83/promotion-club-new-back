import ShowUsersServices from "../../../services/user/show-users.service";
import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateUserPermissionsService from "../../../services/users-permissions/update-user-permissions.service";
import CreateUserPushTokenService from "../../../services/user-push-tokens/create-user-push-token.service";

class UserController {
  public async show(request: Request, response: Response) {
    const showUsersService = container.resolve(ShowUsersServices);
    const showUsers = (await showUsersService.execute(request.query)).map((user) => (user.password = "*")); // não vou criar um service so pra esconder uma senha pelo amor de deus
    return response.status(200).json(showUsers);
  }

  public async updateUserPermissions(request: Request, response: Response) {
    const id = String(request.params.id);
    const updateUserPermissionsService = container.resolve(UpdateUserPermissionsService);
    await updateUserPermissionsService.execute(id, request.body);
    return response.status(200).send();
  }

  public async me(request: Request, response: Response) {
    const userId = String(request.user_id);
    const showUsersService = container.resolve(ShowUsersServices);
    const showUser = (await showUsersService.execute({ id: userId, join_user_permissions: true })).map((user) => (user.password = "*")); // não vou criar um service so pra esconder uma senha pelo amor de deus
    return response.status(200).json(showUser);
  }

  public async createUserPushToken(request: Request, response: Response) {
    const user_id = request.user_id;
    const createUserPushTokenService = container.resolve(CreateUserPushTokenService);
    const userPushToken = await createUserPushTokenService.execute(user_id, request.body);
    return response.status(201).json(userPushToken);
  }
}

export default UserController;
