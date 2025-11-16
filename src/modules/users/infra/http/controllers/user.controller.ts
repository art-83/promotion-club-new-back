import UserQueryOptionsDTO from "../../../dtos/user-query-options.dto";
import CreateUserSessionService from "../../../services/user/create-user-session.service";
import CreateUserService from "../../../services/user/create-user.service";
import ShowUsersServices from "../../../services/user/show-users.service";
import { Request, Response } from "express";
import { container } from "tsyringe";

class UserController {
  public async show(request: Request<{}, {}, {}, UserQueryOptionsDTO>, response: Response) {
    const showUsersService = container.resolve(ShowUsersServices);
    const showUsers = await showUsersService.execute(request.query);
    return response.status(200).json(showUsers);
  }

  public async me(request: Request, response: Response) {
    const userId = String(request.user_id);
    const showUsersService = container.resolve(ShowUsersServices);
    const showUser = await showUsersService.execute({ id: userId });
    return response.status(200).json(showUser);
  }
}

export default UserController;
