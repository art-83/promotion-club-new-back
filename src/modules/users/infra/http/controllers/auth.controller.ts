import { container } from "tsyringe";
import CreateUserService from "../../../services/user/create-user.service";
import { Request, Response } from "express";
import CreateUserSessionService from "../../../services/user/create-user-session.service";

class AuthController {
  public async signUp(request: Request, response: Response) {
    const createUserService = container.resolve(CreateUserService);
    const createUser = await createUserService.execute(request.body);
    return response.status(201).json(createUser);
  }

  public async signIn(request: Request, response: Response) {
    const createUserSessionService = container.resolve(CreateUserSessionService);
    const userSession = await createUserSessionService.execute(request.body.email, request.body.password);
    return response.status(200).json(userSession);
  }
}

export default AuthController;
