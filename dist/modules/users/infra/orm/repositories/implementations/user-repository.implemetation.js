"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = __importDefault(require("../../entities/user.entity"));
const database_1 = __importDefault(require("../../../../../../shared/infra/orm/database"));
class UserRepository {
    repository;
    constructor() {
        this.repository = database_1.default.getRepository(user_entity_1.default);
    }
    async find(options) {
        const query = this.repository.createQueryBuilder("users");
        if (options.id)
            query.andWhere("users.id = :id", { id: options.id });
        if (options.name)
            query.andWhere("users.name ILIKE :name", { name: `%${options.name}%` });
        if (options.email)
            query.andWhere("users.email = :email", {
                email: options.email,
            });
        if (options.cpf)
            query.andWhere("users.cpf = :cpf", { cpf: options.cpf });
        if (options.created_at)
            query.andWhere("users.created_at = :created_at", {
                created_at: options.created_at,
            });
        if (options.updated_at)
            query.andWhere("users.updated_at = :updated_at", {
                updated_at: options.updated_at,
            });
        if (options.join_user_permissions)
            query.leftJoinAndSelect("users.user_permissions", "user_permissions");
        if (options.start_date)
            query.andWhere("users.create_at >= :start_date", {
                start_date: options.start_date,
            });
        if (options.end_date)
            query.andWhere("users.create_at <= :end_date", {
                end_date: options.end_date,
            });
        if (options.offset)
            query.skip(options.offset);
        if (options.limit)
            query.take(options.limit);
        return await query.getMany();
    }
    async create(data) {
        const createUser = this.repository.create(data);
        const saveUser = await this.repository.save(createUser);
        return saveUser;
    }
    async update(id, data) {
        await this.repository.update(id, data);
    }
    async delete(id) {
        await this.repository.delete(id);
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user-repository.implemetation.js.map