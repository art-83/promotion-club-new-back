import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../../../../users/infra/orm/entities/user.entity";
import Promotion from "../../../../promotions/infra/orm/entities/promotion.entity";

@Entity({ name: "promotion_tickets" })
class PromotionTicket {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  saved_money: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.promotional_ticket)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotion_tickets)
  @JoinColumn({ name: "promotion_id" })
  promotion: Promotion;
}

export default PromotionTicket;
