import DefaultQueryOptions from "../../../shared/infra/orm/dtos/default-query-options.dto";
import PromotionTicket from "../infra/orm/entities/promotion-ticket.entity";

interface PromotionTicketQueryOptionsDTO extends PromotionTicket, DefaultQueryOptions {
  join_user?: boolean;
  join_promotion?: boolean;
}

export default PromotionTicketQueryOptionsDTO;
