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
    const params: unknown[] = [store_id];
    let where = "WHERE p.store_id = $1";

    if (options.start_date) {
      params.push(options.start_date);
      where += ` AND pt.created_at >= $${params.length}`;
    }
    if (options.end_date) {
      params.push(options.end_date);
      where += ` AND pt.created_at <= $${params.length}`;
    }

    const bestSellerSql = `
      SELECT p.name AS name,
             SUM(p.final_price) AS revenue,
             COUNT(pt.id) AS total_items_selled
      FROM promotion_tickets pt
      LEFT JOIN promotions p ON pt.promotion_id = p.id
      ${where}
      GROUP BY p.name
      ORDER BY revenue DESC
      LIMIT 10
    `;

    const totalRevenueSql = `
      SELECT SUM(p.final_price) AS total_revenue
      FROM promotion_tickets pt
      LEFT JOIN promotions p ON pt.promotion_id = p.id
      ${where}
    `;

    const [bestSellerItemsRaw, totalRevenueRows] = await Promise.all([
      this.repository.query(bestSellerSql, params),
      this.repository.query(totalRevenueSql, params),
    ]);

    const totalRevenueResult = totalRevenueRows[0];
    const total_revenue = totalRevenueResult ? Number(totalRevenueResult.total_revenue) : 0;
    const best_seller_items = bestSellerItemsRaw.map((item: { name: string; revenue: string; total_items_selled: string }) => ({
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
    const params: unknown[] = [];
    let where = "WHERE 1=1";

    if (options.start_date) {
      params.push(options.start_date);
      where += ` AND pt.created_at >= $${params.length}`;
    }
    if (options.end_date) {
      params.push(options.end_date);
      where += ` AND pt.created_at <= $${params.length}`;
    }

    const generalStatsSql = `
      SELECT SUM(p.final_price) AS total_revenue,
             COUNT(pt.id) AS total_tickets
      FROM promotion_tickets pt
      LEFT JOIN promotions p ON pt.promotion_id = p.id
      ${where}
    `;

    const topSellerSql = `
      SELECT p.name AS name, COUNT(pt.id) AS sell_count
      FROM promotion_tickets pt
      LEFT JOIN promotions p ON pt.promotion_id = p.id
      ${where}
      GROUP BY p.name
      ORDER BY sell_count DESC
      LIMIT 1
    `;

    const [generalStatsRows, topSellerRows] = await Promise.all([
      this.repository.query(generalStatsSql, params),
      this.repository.query(topSellerSql, params),
    ]);

    const generalStats = generalStatsRows[0];
    const topSeller = topSellerRows[0];

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

    if (options.promotion_name) {
      ticketsQuery.andWhere("promotion.name ILIKE :promotion_name", { promotion_name: `%${options.promotion_name}%` });
    }
    if (options.store_id) {
      ticketsQuery.andWhere("promotion.store_id = :store_id", { store_id: options.store_id });
    }
    if (options.start_date) {
      ticketsQuery.andWhere("ticket.created_at >= :start_date", { start_date: options.start_date });
    }
    if (options.end_date) {
      ticketsQuery.andWhere("ticket.created_at <= :end_date", { end_date: options.end_date });
    }
    if (options.limit) ticketsQuery.take(options.limit);
    if (options.offset) ticketsQuery.skip(options.offset);

    const totalsParams: unknown[] = [user_id];
    let totalsWhere = "WHERE pt.user_id = $1";

    if (options.promotion_name) {
      totalsParams.push(`%${options.promotion_name}%`);
      totalsWhere += ` AND p.name ILIKE $${totalsParams.length}`;
    }
    if (options.store_id) {
      totalsParams.push(options.store_id);
      totalsWhere += ` AND p.store_id = $${totalsParams.length}`;
    }
    if (options.start_date) {
      totalsParams.push(options.start_date);
      totalsWhere += ` AND pt.created_at >= $${totalsParams.length}`;
    }
    if (options.end_date) {
      totalsParams.push(options.end_date);
      totalsWhere += ` AND pt.created_at <= $${totalsParams.length}`;
    }

    const totalsSql = `
      SELECT SUM(p.price - p.final_price) AS total_money_saved,
             COUNT(pt.id) AS total_tickets
      FROM promotion_tickets pt
      LEFT JOIN promotions p ON pt.promotion_id = p.id
      ${totalsWhere}
    `;

    const [promotion_tickets, totalsRows] = await Promise.all([
      ticketsQuery.getMany(),
      this.repository.query(totalsSql, totalsParams),
    ]);

    const totals = totalsRows[0];

    return {
      promotion_tickets,
      total_money_saved: totals && totals.total_money_saved ? Number(totals.total_money_saved) : 0,
      total_tickets: totals && totals.total_tickets ? Number(totals.total_tickets) : 0,
    };
  }
}

export default PromotionTicketRepository;
