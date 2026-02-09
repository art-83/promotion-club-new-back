import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Promotion from "../../infra/orm/entities/promotion.entity";
import PromotionTicket from "../../../tickets/infra/orm/entities/promotion-ticket.entity";
import PromotionTicketQueryOptionsDTO from "../../../tickets/dtos/promotion-ticket-query-options.dto";
import PromotionQueryOptionsDTO from "../../dtos/promotions/promotion-query-options.dto";

// so Deus sabe oq é isso, eu sei que uma markov chain, só não me pergunte como funciona.
@injectable()
class ShowListOfRecommendedPromotionsByPromotionTicketService {
  constructor(
    @inject("PromotionRepository")
    private promotionRepository: RepositoryProvider<Promotion>,
    @inject("PromotionTicketRepository")
    private promotionTicketRepository: RepositoryProvider<PromotionTicket>
  ) {}

  public async execute(promotion_ticket_id: string): Promise<Promotion[]> {
    const ticket = (await this.promotionTicketRepository.find({ id: promotion_ticket_id })).at(0);
    if (!ticket?.promotion?.store?.id) return [];

    const store_id = ticket.promotion.store.id;

    const promotionTicketQueryOptions = {
      store_id,
      limit: 10000,
    } as Partial<PromotionTicketQueryOptionsDTO>;

    const promotionQueryOptions = {
      store_id,
      is_approved: true,
    } as Partial<PromotionQueryOptionsDTO>;

    const [allTicketsForStore, activePromotions] = await Promise.all([
      this.promotionTicketRepository.find(promotionTicketQueryOptions),
      this.promotionRepository.find(promotionQueryOptions),
    ]);

    const now = new Date();
    const activePromotionsFiltered = activePromotions.filter((p) => p.expire_at > now && !p.deleted_at);
    const recommendationCount = Math.min(3, activePromotionsFiltered.length);
    if (recommendationCount === 0) return [];

    const currentPromotionId = ticket.promotion.id;
    const activePromotionIds = new Set(activePromotionsFiltered.map((p) => p.id));

    const transitionCounts = this.buildTransitionCounts(allTicketsForStore);
    const transitionMatrix = this.normalizeTransitionMatrix(transitionCounts);

    const recommendedIds = this.pickTopRecommendations(
      transitionMatrix,
      currentPromotionId,
      activePromotionIds,
      recommendationCount
    );

    if (recommendedIds.length === 0) {
      return activePromotionsFiltered
        .filter((p) => p.id !== currentPromotionId)
        .slice(0, recommendationCount);
    }

    const promotionById = new Map(activePromotionsFiltered.map((p) => [p.id, p]));
    return recommendedIds.map((id) => promotionById.get(id)).filter((p): p is Promotion => p != null);
  }

  private buildTransitionCounts(tickets: PromotionTicket[]): Map<string, Map<string, number>> {
    const counts = new Map<string, Map<string, number>>();

    const byUser = new Map<string, PromotionTicket[]>();
    for (const t of tickets) {
      const uid = t.user?.id ?? "anonymous";
      if (!byUser.has(uid)) byUser.set(uid, []);
      byUser.get(uid)!.push(t);
    }

    for (const userTickets of byUser.values()) {
      const sorted = [...userTickets].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      for (let i = 0; i < sorted.length - 1; i++) {
        const from = sorted[i];
        const to = sorted[i + 1];
        const fromId = from?.promotion?.id;
        const toId = to?.promotion?.id;
        if (!fromId || !toId) continue;
        if (!counts.has(fromId)) counts.set(fromId, new Map());
        const row = counts.get(fromId)!;
        row.set(toId, (row.get(toId) ?? 0) + 1);
      }
    }

    return counts;
  }

  private normalizeTransitionMatrix(
    counts: Map<string, Map<string, number>>
  ): Map<string, Map<string, number>> {
    const matrix = new Map<string, Map<string, number>>();
    for (const [fromId, row] of counts) {
      const total = [...row.values()].reduce((s, c) => s + c, 0);
      if (total === 0) continue;
      const normalized = new Map<string, number>();
      for (const [toId, c] of row) normalized.set(toId, c / total);
      matrix.set(fromId, normalized);
    }
    return matrix;
  }

  private pickTopRecommendations(
    matrix: Map<string, Map<string, number>>,
    currentPromotionId: string,
    activePromotionIds: Set<string>,
    recommendationCount: number
  ): string[] {
    const row = matrix.get(currentPromotionId);
    if (!row) return [];

    const candidates: { id: string; probability: number }[] = [];
    for (const [toId, prob] of row) {
      if (toId !== currentPromotionId && activePromotionIds.has(toId)) {
        candidates.push({ id: toId, probability: prob });
      }
    }
    candidates.sort((a, b) => b.probability - a.probability);
    return candidates.slice(0, recommendationCount).map((c) => c.id);
  }
}

export default ShowListOfRecommendedPromotionsByPromotionTicketService;
