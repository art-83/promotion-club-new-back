"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_permissions_entity_1 = __importDefault(require("../../entities/user-permissions.entity"));
const database_1 = __importDefault(require("../../../../../../shared/infra/orm/database"));
class UserPermissionsRepository {
    repository;
    constructor() {
        this.repository = database_1.default.getRepository(user_permissions_entity_1.default);
    }
    async find(options) {
        const query = this.repository.createQueryBuilder("user_permissions");
        query.leftJoinAndSelect("user_permissions.user", "users");
        if (options.id)
            query.andWhere("user_permissions.id = :id", { id: options.id });
        if (options.user_id)
            query.andWhere("users.id = :user_id", {
                user_id: options.user_id,
            });
        if (options.offset)
            query.skip(options.offset);
        if (options.limit)
            query.take(options.limit);
        return await query.getMany();
    }
    async create(data) {
        const createUserPermission = this.repository.create(data);
        const saveUserPermission = await this.repository.save(createUserPermission);
        return saveUserPermission;
    }
    async update(id, data) {
        await this.repository.update(id, data);
    }
    async delete(id) {
        await this.repository.delete(id);
    }
}
exports.default = UserPermissionsRepository;
//# sourceMappingURL=user-permissions-repository.implementation.js.map