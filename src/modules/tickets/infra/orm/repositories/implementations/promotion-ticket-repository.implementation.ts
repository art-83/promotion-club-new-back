import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionTicket from "../../entities/promotion-ticket.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import PromotionTicketQueryOptionsDTO from "../../../../dtos/promotion-ticket-query-options.dto";
import { Repository } from "typeorm";

class PromotionTicketRepository implements RepositoryProvider<PromotionTicket> {
  private repository: Repository<PromotionTicket>;

  constructor() {
    this.repository = dataSource.getRepository(PromotionTicket);
  }

  public async find(options: PromotionTicketQueryOptionsDTO): Promise<PromotionTicket[]> {
    const query = this.repository.createQueryBuilder("promotion_tickets");

    if (options.id) query.andWhere("promotion_tickets.id = :id", { id: options.id });

    if (options.join_user) query.leftJoinAndSelect("promotion_tickets.user", "users");

    if (options.start_date) query.andWhere("promotion_tickets.created_at >= :start_date", { start_date: options.start_date });

    if (options.end_date) query.andWhere("promotion_tickets.created_at <= :end_date", { end_date: options.end_date });

    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    return await query.getMany();
  }

  public async create(data: Partial<PromotionTicket>): Promise<PromotionTicket> {
    const createPromotionTicket = this.repository.create(data);
    const savePromotionTicket = await this.repository.save(createPromotionTicket);
    return savePromotionTicket;
  }

  public async update(id: string, data: Partial<PromotionTicket>): Promise<void> {
    await this.repository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default PromotionTicketRepository;
