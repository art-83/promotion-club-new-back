import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../../../../users/infra/orm/entities/user.entity";
import Store from "../../../../stores/infra/orm/entities/store.entity";

@Entity({ name: "promotion_tickets" })
class PromotionTicket {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  product_name: string;

  @Column({ type: "decimal" })
  product_price: number;

  @Column({ type: "decimal" })
  promotion_discount_percentage: number;

  @Column({ type: "decimal" })
  promotion_final_price: number;

  @Column({ type: "decimal" })
  saved_money: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.promotional_ticket, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "user_id" })
  user: User | null;

  @ManyToOne(() => Store, (store) => store.promotion_tickets, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "store_id" })
  store: Store | null;
}

export default PromotionTicket;
