import PromotionTicket from "../../entities/promotion-ticket.entity";
import dataSource from "../../../../../../shared/infra/orm/database";
import PromotionTicketQueryOptionsDTO from "../../../../dtos/promotion-ticket-query-options.dto";
import { Repository } from "typeorm";
import PromotionTicketRepositoryProvider from "../providers/promotion-ticket-repository.provider";
import PromotionTickerDashboardDTO from "../../../../dtos/dashboards/promotion-ticket-dashboard.dto";
import GeneralPromotionTicketDashboardDTO from "../../../../dtos/dashboards/general-promotion-ticket-dashboard.dto";
import DefaultQueryOptions from "../../../../../../shared/infra/orm/dtos/default-query-options.dto";

class PromotionTicketRepository implements PromotionTicketRepositoryProvider {
  private repository: Repository<PromotionTicket>;

  constructor() {
    this.repository = dataSource.getRepository(PromotionTicket);
  }

  public async find(options: Partial<PromotionTicketQueryOptionsDTO>): Promise<PromotionTicket[]> {
    const query = this.repository.createQueryBuilder("promotion_tickets");
    query.leftJoinAndSelect("promotion_tickets.promotion", "promotion");
    query.leftJoinAndSelect("promotion.store", "store");

    if (options.join_user) query.leftJoinAndSelect("promotion_tickets.user", "user");
    if (options.join_promotion_tags) {
      query.leftJoinAndSelect("promotion.promotion_tags", "promotion_tags");
      query.leftJoinAndSelect("promotion_tags.tag", "tag");
    }
    if (options.id) query.andWhere("promotion_tickets.id = :id", { id: options.id });
    if (options.user_id) query.andWhere("promotion_tickets.user_id = :user_id", { user_id: options.user_id });
    if (options.store_id) query.andWhere("promotion.store_id = :store_id", { store_id: options.store_id });

    if (options.start_date) query.andWhere("promotion_tickets.created_at >= :start_date", { start_date: options.start_date });
    if (options.end_date) query.andWhere("promotion_tickets.created_at <= :end_date", { end_date: options.end_date });

    if (options.offset) query.skip(options.offset);
    if (options.limit) query.take(options.limit);

    query.orderBy("promotion_tickets.created_at", "DESC");
    query.andWhere("promotion_tickets.deleted_at IS NULL");

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
    await this.repository.softDelete(id);
  }

  public async getCountDashboardByStore(store_id: string, options: DefaultQueryOptions): Promise<PromotionTickerDashboardDTO> {
    const bestSellerItemsQuery = this.repository
      .createQueryBuilder("ticket")
      .leftJoin("ticket.promotion", "promotion")
      .select("promotion.name", "name")
      .addSelect("SUM(promotion.final_price)", "revenue")
      .addSelect("COUNT(ticket.id)", "total_items_selled")
      .where("promotion.store_id = :store_id", { store_id })
      .andWhere("ticket.deleted_at IS NULL")
      .groupBy("promotion.name")
      .orderBy("revenue", "DESC")
      .limit(10);

    const totalRevenueQuery = this.repository
      .createQueryBuilder("ticket")
      .leftJoin("ticket.promotion", "promotion")
      .select("SUM(promotion.final_price)", "total_revenue")
      .where("promotion.store_id = :store_id", { store_id })
      .andWhere("ticket.deleted_at IS NULL");

    if (options.start_date) {
      bestSellerItemsQuery.andWhere("ticket.created_at >= :start_date", { start_date: options.start_date });
      totalRevenueQuery.andWhere("ticket.created_at >= :start_date", { start_date: options.start_date });
    }
    if (options.end_date) {
      bestSellerItemsQuery.andWhere("ticket.created_at <= :end_date", { end_date: options.end_date });
      totalRevenueQuery.andWhere("ticket.created_at <= :end_date", { end_date: options.end_date });
    }

    const [bestSellerItemsRaw, totalRevenueResult] = await Promise.all([bestSellerItemsQuery.getRawMany(), totalRevenueQuery.getRawOne()]);

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
      .leftJoin("ticket.promotion", "promotion")
      .select("SUM(promotion.final_price)", "total_revenue")
      .addSelect("COUNT(ticket.id)", "total_tickets")
      .andWhere("ticket.deleted_at IS NULL");

    if (options.start_date) {
      generalStatsQuery.andWhere("ticket.created_at >= :start_date", { start_date: options.start_date });
    }

    if (options.end_date) {
      generalStatsQuery.andWhere("ticket.created_at <= :end_date", { end_date: options.end_date });
    }

    const topSellerQuery = this.repository
      .createQueryBuilder("ticket")
      .leftJoin("ticket.promotion", "promotion")
      .select("promotion.name", "name")
      .addSelect("COUNT(ticket.id)", "sell_count")
      .groupBy("promotion.name")
      .orderBy("sell_count", "DESC")
      .limit(1)
      .andWhere("ticket.deleted_at IS NULL");

    if (options.start_date) {
      topSellerQuery.andWhere("ticket.created_at >= :start_date", { start_date: options.start_date });
    }

    if (options.end_date) {
      topSellerQuery.andWhere("ticket.created_at <= :end_date", { end_date: options.end_date });
    }

    const [generalStats, topSeller] = await Promise.all([generalStatsQuery.getRawOne(), topSellerQuery.getRawOne()]);

    const general_total_revenue = generalStats && generalStats.total_revenue ? Number(generalStats.total_revenue) : 0;
    const general_total_tickets_quantity = generalStats && generalStats.total_tickets ? Number(generalStats.total_tickets) : 0;
    const general_top_seller_product = topSeller && topSeller.name ? topSeller.name : "";

    return {
      general_total_revenue,
      general_total_tickets_quantity,
      general_top_seller_product,
    };
  }

  public async getFullDashboardByUser(
    user_id: string,
    options: Partial<PromotionTicketQueryOptionsDTO>
  ): Promise<{ promotion_tickets: PromotionTicket[]; total_money_saved: number; total_tickets: number }> {
    const ticketsQuery = this.repository
      .createQueryBuilder("ticket")
      .withDeleted()
      .leftJoinAndSelect("ticket.promotion", "promotion")
      .leftJoinAndSelect("promotion.file", "file")
      .leftJoinAndSelect("promotion.store", "store")
      .where("ticket.user_id = :user_id", { user_id })
      .andWhere("ticket.deleted_at IS NULL")
      .orderBy("ticket.created_at", "DESC");

    if (options.limit) ticketsQuery.take(options.limit);

    const totalsQuery = this.repository
      .createQueryBuilder("ticket")
      .leftJoin("ticket.promotion", "promotion")
      .select("SUM(promotion.price - promotion.final_price)", "total_money_saved")
      .addSelect("COUNT(ticket.id)", "total_tickets")
      .where("ticket.user_id = :user_id", { user_id })
      .andWhere("ticket.deleted_at IS NULL");

    if (options.promotion_name) {
      ticketsQuery.andWhere("promotion.name ILIKE :promotion_name", { promotion_name: `%${options.promotion_name}%` });
      totalsQuery.andWhere("promotion.name ILIKE :promotion_name", { promotion_name: `%${options.promotion_name}%` });
    }

    if (options.store_id) {
      ticketsQuery.andWhere("promotion.store_id = :store_id", { store_id: options.store_id });
      totalsQuery.andWhere("promotion.store_id = :store_id", { store_id: options.store_id });
    }

    if (options.start_date) {
      ticketsQuery.andWhere("ticket.created_at >= :start_date", { start_date: options.start_date });
      totalsQuery.andWhere("ticket.created_at >= :start_date", { start_date: options.start_date });
    }

    if (options.end_date) {
      ticketsQuery.andWhere("ticket.created_at <= :end_date", { end_date: options.end_date });
      totalsQuery.andWhere("ticket.created_at <= :end_date", { end_date: options.end_date });
    }

    if (options.offset) {
      ticketsQuery.skip(options.offset);
    }

    const [promotion_tickets, totals] = await Promise.all([ticketsQuery.getMany(), totalsQuery.getRawOne()]);

    return {
      promotion_tickets,
      total_money_saved: totals && totals.total_money_saved ? Number(totals.total_money_saved) : 0,
      total_tickets: totals && totals.total_tickets ? Number(totals.total_tickets) : 0,
    };
  }
}

export default PromotionTicketRepository;
