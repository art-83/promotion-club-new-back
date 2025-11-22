import PromotionTicket from "../../entities/promotion-ticket.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import PromotionTicketQueryOptionsDTO from "../../../../dtos/promotion-ticket-query-options.dto";
import { Repository } from "typeorm";
import PromotionTicketRepositoryProviders from "../providers/promotion-ticket-repository.provider";
import PromotionTickerDashboardDTO from "../../../../dtos/dashboards/promotion-ticket-dashboard.dto";

class PromotionTicketRepository implements PromotionTicketRepositoryProviders {
  private repository: Repository<PromotionTicket>;

  constructor() {
    this.repository = dataSource.getRepository(PromotionTicket);
  }

  public async find(options: PromotionTicketQueryOptionsDTO): Promise<PromotionTicket[]> {
    const query = this.repository.createQueryBuilder("promotion_tickets");
    query.leftJoinAndSelect("promotion_tickets.user", "user");
    query.leftJoinAndSelect("promotion_tickets.store", "store");

    if (options.id) query.andWhere("promotion_tickets.id = :id", { id: options.id });
    if (options.user_id) query.andWhere("user.id = :user_id", { user_id: options.user_id });
    if (options.store_id) query.andWhere("store.id = :store_id", { store_id: options.store_id });

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

  public async getCountDashboardByStore(store_id: string): Promise<PromotionTickerDashboardDTO> {
    const promotionTickets = await this.repository
      .createQueryBuilder("ticket")
      .where("ticket.store_id = :store_id", { store_id })
      .getMany();

    const dashboardData: PromotionTickerDashboardDTO = {
      total_revenue: 0,
      best_seller_items: [],
    };

    if (promotionTickets.length === 0) {
      return dashboardData;
    }

    const productsMap = new Map<
      string,
      {
        name: string;
        revenue: number;
        total_items_selled: number;
      }
    >();

    let totalRevenue = 0;

    for (const ticket of promotionTickets) {
      totalRevenue += Number(ticket.promotion_final_price);

      const productName = ticket.product_name;

      if (productsMap.has(productName)) {
        const productStats = productsMap.get(productName)!;
        productStats.revenue += Number(ticket.promotion_final_price);
        productStats.total_items_selled += 1;
      } else {
        productsMap.set(productName, {
          name: productName,
          revenue: Number(ticket.promotion_final_price),
          total_items_selled: 1,
        });
      }
    }

    dashboardData.total_revenue = totalRevenue;
    dashboardData.best_seller_items = Array.from(productsMap.values()).sort((a, b) => b.revenue - a.revenue);

    return dashboardData;
  }
}

export default PromotionTicketRepository;
