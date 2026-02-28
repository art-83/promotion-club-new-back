import { container } from "tsyringe";
import CreateUserAndVinculateUserPermissionsService from "../../../services/user/create-user-and-vinculate-user-permissions.service";
import { Request, Response } from "express";
import CreateUserSessionService from "../../../services/user/create-user-session.service";
import RequestPasswordResetService from "../../../services/user/request-password-reset.service";
import ValidatePasswordResetCodeService from "../../../services/user/validate-password-reset-code.service";

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

  public async requestPasswordReset(request: Request, response: Response) {
    const requestPasswordResetService = container.resolve(RequestPasswordResetService);
    const result = await requestPasswordResetService.execute(request.body.email);
    return response.status(200).json(result);
  }

  public async validatePasswordResetCode(request: Request, response: Response) {
    const validatePasswordResetCodeService = container.resolve(ValidatePasswordResetCodeService);
    const token = await validatePasswordResetCodeService.execute(request.body);
    return response.status(200).json({ message: "Password reset code validated successfully!", token });
  }
}

export default AuthController;
