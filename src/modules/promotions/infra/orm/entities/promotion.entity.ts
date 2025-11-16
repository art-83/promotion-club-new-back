import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Product from "./product.entity";
import PromotionTicket from "../../../../tickets/infra/orm/entities/promotion-ticket.entity";

@Entity({ name: "promotions" })
class Promotion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  is_approved: boolean;

  @Column()
  discount_percentage: number;

  @Column()
  expire_at: Date;

  @Column()
  final_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Product, (product) => product.promotion, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @OneToMany(() => PromotionTicket, (promotion_tickets) => promotion_tickets.promotion)
  promotion_tickets: PromotionTicket[];
}

export default Promotion;
