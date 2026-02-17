import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "../../../../users/infra/orm/entities/user.entity";
import Promotion from "../../../../promotions/infra/orm/entities/promotion.entity";

@Entity({ name: "promotion_tickets" })
class PromotionTicket {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.promotion_ticket, {
    nullable: true,
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotion_tickets)
  @JoinColumn({ name: "promotion_id" })
  promotion: Promotion;
}

export default PromotionTicket;
