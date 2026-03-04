import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Store from "../../../../stores/infra/orm/entities/store.entity";
import File from "../../../../files/infra/orm/entities/file.entity";
import PromotionTag from "./promotion-tag.entity";
import PromotionTicket from "../../../../tickets/infra/orm/entities/promotion-ticket.entity";
import PromotionPromotionCategory from "./promotion-promotion-category.entity";

@Entity({ name: "promotions" })
class Promotion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "decimal" })
  price: number;

  @Column({ default: false })
  is_approved: boolean;

  @Column()
  discount_percentage: number;

  @Column()
  expire_at: Date;

  @Column({ type: "decimal" })
  final_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Store, (store) => store.promotions)
  @JoinColumn({ name: "store_id" })
  store: Store;

  @OneToOne(() => File, (file) => file.promotion)
  @JoinColumn({ name: "file_id" })
  file: File;

  @OneToMany(() => PromotionTag, (promotionTag) => promotionTag.promotion)
  promotion_tags: PromotionTag[];

  @OneToMany(() => PromotionTicket, (promotionTicket) => promotionTicket.promotion)
  promotion_tickets: PromotionTicket[];

  @OneToMany(() => PromotionPromotionCategory, (promotionPromotionCategory) => promotionPromotionCategory.promotion)
  promotion_promotion_categories: PromotionPromotionCategory[];
}

export default Promotion;
