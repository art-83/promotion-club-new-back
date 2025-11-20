import { container } from "tsyringe";
import CreateUserAndVinculateUserPermissionsService from "../../../services/user/create-user-and-vinculate-user-permissions.service";
import { Request, Response } from "express";
import CreateUserSessionService from "../../../services/user/create-user-session.service";

class AuthController {
  public async signUp(request: Request, response: Response) {
    const createUserAndVinculateUserPermissionsService = container.resolve(CreateUserAndVinculateUserPermissionsService);
    const createUser = await createUserAndVinculateUserPermissionsService.execute(request.body);
    return response.status(201).json(createUser);
  }

  public async signIn(request: Request, response: Response) {
    const createUserSessionService = container.resolve(CreateUserSessionService);
    const userSession = await createUserSessionService.execute(request.body.email, request.body.password);
    return response.status(200).json(userSession);
  }
}

export default AuthController;
