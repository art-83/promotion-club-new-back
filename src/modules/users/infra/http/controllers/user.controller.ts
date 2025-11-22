import UserQueryOptionsDTO from "../../../dtos/users/user-query-options.dto";
import ShowUsersServices from "../../../services/user/show-users.service";
import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateUserPermissionsService from "../../../services/users-permissions/update-user-permissions.service";
import ShowUserPermissionsService from "../../../services/users-permissions/show-user-permissions.service";

class UserController {
  public async show(request: Request<{}, {}, {}, UserQueryOptionsDTO>, response: Response) {
    const showUsersService = container.resolve(ShowUsersServices);
    const showUsers = await showUsersService.execute(request.query);
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
    const showUser = await showUsersService.execute({ id: userId, join_user_permissions: true });
    return response.status(200).json(showUser);
  }
}

export default UserController;
