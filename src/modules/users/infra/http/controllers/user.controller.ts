import ShowUsersServices from "../../../services/user/show-users.service";
import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateUserPermissionsService from "../../../services/user-permissions/update-user-permissions.service";
import CreateUserPushTokenService from "../../../services/user-push-token/create-or-update-user-push-token.service";
import CreateUserStoreOptionsService from "../../../services/user-store-options/create-user-store-options.service";
import DeleteUserStoreOptionsService from "../../../services/user-store-options/delete-user-store-options.service";
import ShowUserStoreOptionsService from "../../../services/user-store-options/show-user-store-options.service";
import ShowUserBenefitsServiceByUser from "../../../../benefits/services/user-benefits/show-user-benefits.service";
import CreateUserBenefitService from "../../../../benefits/services/user-benefits/create-user-benefit.service";
import DeleteUserBenefitService from "../../../../benefits/services/user-benefits/delete-user-benefit.service";

class UserController {
  public async show(request: Request, response: Response) {
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

  public async createUserPushToken(request: Request, response: Response) {
    const user_id = request.user_id;
    const createUserPushTokenService = container.resolve(CreateUserPushTokenService);
    const userPushToken = await createUserPushTokenService.execute(user_id, request.body);
    return response.status(201).json(userPushToken);
  }

  public async showUserStoreOptions(request: Request, response: Response) {
    const user_id = request.user_id;
    const showUserStoreOptionsService = container.resolve(ShowUserStoreOptionsService);
    const userStoreOptions = await showUserStoreOptionsService.execute({ user_id });
    return response.status(200).json(userStoreOptions);
  }

  public async createUserStoreOptions(request: Request, response: Response) {
    const user_id = request.user_id;
    const store_id = String(request.params.store_id);
    const createUserStoreOptionsService = container.resolve(CreateUserStoreOptionsService);
    const userStoreOptions = await createUserStoreOptionsService.execute({ user_id, store_id });
    return response.status(201).json(userStoreOptions);
  }

  public async deleteUserStoreOptions(request: Request, response: Response) {
    const user_id = request.user_id;
    const store_id = String(request.params.store_id);
    const deleteUserStoreOptionsService = container.resolve(DeleteUserStoreOptionsService);
    await deleteUserStoreOptionsService.execute(user_id, store_id);
    return response.status(204).send();
  }

  public async showUserBenefits(request: Request, response: Response) {
    const user_id = request.user_id;
    const showUserBenefitsServiceByUser = container.resolve(ShowUserBenefitsServiceByUser);
    const userBenefits = await showUserBenefitsServiceByUser.execute(user_id, request.query);
    return response.status(200).json(userBenefits);
  }

  public async createUserBenefit(request: Request, response: Response) {
    const user_id = request.user_id;
    const benefit_id = String(request.params.benefit_id);
    const createUserBenefitService = container.resolve(CreateUserBenefitService);
    const userBenefit = await createUserBenefitService.execute({ user_id, benefit_id });
    return response.status(201).json(userBenefit);
  }

  public async deleteUserBenefit(request: Request, response: Response) {
    const user_id = request.user_id;
    const benefit_id = String(request.params.benefit_id);
    const deleteUserBenefitService = container.resolve(DeleteUserBenefitService);
    await deleteUserBenefitService.execute(user_id, benefit_id);
    return response.status(204).send();
  }
}

export default UserController;
