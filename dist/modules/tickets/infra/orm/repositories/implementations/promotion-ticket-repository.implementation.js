"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promotion_ticket_entity_1 = __importDefault(require("../../entities/promotion-ticket.entity"));
const database_1 = __importDefault(require("../../../../../../shared/infra/orm/database"));
class PromotionTicketRepository {
    repository;
    constructor() {
        this.repository = database_1.default.getRepository(promotion_ticket_entity_1.default);
    }
    async find(options) {
        const query = this.repository.createQueryBuilder("promotion_tickets");
        if (options.id)
            query.andWhere("promotion_tickets.id = :id", { id: options.id });
        if (options.join_user)
            query.leftJoinAndSelect("promotion_tickets.user", "users");
        if (options.start_date)
            query.andWhere("promotion_tickets.created_at >= :start_date", { start_date: options.start_date });
        if (options.end_date)
            query.andWhere("promotion_tickets.created_at <= :end_date", { end_date: options.end_date });
        if (options.offset)
            query.skip(options.offset);
        if (options.limit)
            query.take(options.limit);
        return await query.getMany();
    }
    async create(data) {
        const createPromotionTicket = this.repository.create(data);
        const savePromotionTicket = await this.repository.save(createPromotionTicket);
        return savePromotionTicket;
    }
    async update(id, data) {
        await this.repository.update(id, data);
    }
    async delete(id) {
        await this.repository.delete(id);
    }
}
exports.default = PromotionTicketRepository;
//# sourceMappingURL=promotion-ticket-repository.implementation.js.map