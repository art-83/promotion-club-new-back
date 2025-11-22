import PromotionTicket from "../../entities/promotion-ticket.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import PromotionTicketQueryOptionsDTO from "../../../../dtos/promotion-ticket-query-options.dto";
import { Repository } from "typeorm";
import PromotionTicketRepositoryProviders from "../providers/promotion-ticket-repository.provider";
import PromotionTickerDashboardDTO from "../../../../dtos/dashboards/promotion-ticket-dashboard.dto";
import GeneralPromotionTicketDashboardDTO from "../../../../dtos/dashboards/general-promotion-ticket-dashboard.dto";
import DefaultQueryOptions from "../../../../../../shared/infra/orm/dtos/default-query-options.dto";

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
    const bestSellerItemsPromise = this.repository
      .createQueryBuilder("ticket")
      .select("ticket.product_name", "name")
      .addSelect("SUM(ticket.promotion_final_price)", "revenue")
      .addSelect("COUNT(ticket.id)", "total_items_selled")
      .where("ticket.store_id = :store_id", { store_id })
      .groupBy("ticket.product_name")
      .orderBy("revenue", "DESC")
      .limit(10)
      .getRawMany();

    const totalRevenuePromise = this.repository
      .createQueryBuilder("ticket")
      .select("SUM(ticket.promotion_final_price)", "total_revenue")
      .where("ticket.store_id = :store_id", { store_id })
      .getRawOne();

    const [bestSellerItemsRaw, totalRevenueResult] = await Promise.all([bestSellerItemsPromise, totalRevenuePromise]);

    const total_revenue = totalRevenueResult ? Number(totalRevenueResult.total_revenue) : 0;
    const best_seller_items = bestSellerItemsRaw.map((item) => ({
      name: item.name,
      revenue: Number(item.revenue),
      total_items_selled: Number(item.total_items_selled),
    }));

    return {
      total_revenue,
      best_seller_items,
    };
  }
  
  public async getGeneralCountDashboard(options: DefaultQueryOptions): Promise<GeneralPromotionTicketDashboardDTO> {
    const generalStatsQuery = this.repository
      .createQueryBuilder("ticket")
      .select("SUM(ticket.promotion_final_price)", "total_revenue")
      .addSelect("COUNT(ticket.id)", "total_tickets");

    if (options.start_date) {
      generalStatsQuery.andWhere("ticket.created_at >= :start_date", { start_date: options.start_date });
    }
    if (options.end_date) {
      generalStatsQuery.andWhere("ticket.created_at <= :end_date", { end_date: options.end_date });
    }

    const topSellerQuery = this.repository
      .createQueryBuilder("ticket")
      .select("COUNT(ticket.id)", "sell_count")
      .groupBy("ticket.product_name")
      .orderBy("sell_count", "DESC")
      .limit(1);

    if (options.start_date) {
      topSellerQuery.andWhere("ticket.created_at >= :start_date", { start_date: options.start_date });
    }
    if (options.end_date) {
      topSellerQuery.andWhere("ticket.created_at <= :end_date", { end_date: options.end_date });
    }

    const [generalStats, topSeller] = await Promise.all([generalStatsQuery.getRawOne(), topSellerQuery.getRawOne()]);

    const general_total_revenue = generalStats && generalStats.total_revenue ? Number(generalStats.total_revenue) : 0;
    const general_total_tickets_quantity = generalStats && generalStats.total_tickets ? Number(generalStats.total_tickets) : 0;
    const general_top_seller_product = topSeller && topSeller.sell_count ? Number(topSeller.sell_count) : 0;

    return {
      general_total_revenue,
      general_total_tickets_quantity,
      general_top_seller_product,
    };
  }
}

export default PromotionTicketRepository;
