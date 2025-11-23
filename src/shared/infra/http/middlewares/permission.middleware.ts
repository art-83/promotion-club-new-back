import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import ShowUserPermissionsService from "../../../../modules/users/services/users-permissions/show-user-permissions.service";
import AppError from "../errors/app-error";

function permissionMiddleware(requiredPermission: string) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const showUserPermissionsService = container.resolve(ShowUserPermissionsService);
      const userPermissions = (await showUserPermissionsService.execute({ user_id: request.user_id })).at(0);
      if (!userPermissions) throw new AppError(404, "User permissions not found.");
      const hasPermission = userPermissions.permissions.includes(requiredPermission);
      if (!hasPermission) {
        return response.status(403).json({ message: "Insufficient permissions." });
      }
    } catch (error) {
      if (error instanceof AppError) return response.status(error.code).json({ message: error.message });
      return response.status(403).json({ message: "Insufficient permissions." });
    }
    next();
  };
}

export default permissionMiddleware;
