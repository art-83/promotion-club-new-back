import DefaultQueryOptions from "../../../shared/infra/orm/dtos/default-query-options.dto";
import PromotionTicket from "../infra/orm/entities/promotion-ticket.entity";

interface PromotionTicketQueryOptionsDTO extends PromotionTicket, DefaultQueryOptions {
  user_id: string;
  store_id: string;
}

export default PromotionTicketQueryOptionsDTO;
