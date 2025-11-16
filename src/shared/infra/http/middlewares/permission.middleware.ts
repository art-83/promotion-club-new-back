import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import ShowUserPermissionsService from "../../../../modules/users/services/users-permissions/show-user-permissions.service";
import AppError from "../errors/app-error";

const permissionMiddleware = (requiredPermission: string) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const showUserPermissionsService = container.resolve(ShowUserPermissionsService);
      const userPermissions = (await showUserPermissionsService.execute({ user_id: request.user_id })).at(0);

      if (!userPermissions || !userPermissions.permissions.includes(requiredPermission)) {
        return response.status(403).json({ message: "Insufficient permissions." });
      }
    } catch (error) {
      if (error instanceof AppError) return response.status(error.code).json({ message: error.message });
      return response.status(403).json({ message: "Insufficient permissions." });
    }
    next();
  };
};

export default permissionMiddleware;
