import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import PromotionPromotionCategory from "./promotion-promotion-category.entity";
import Store from "../../../../stores/infra/orm/entities/store.entity";

@Entity({ name: "promotion_categories" })
class PromotionCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Store, (store) => store.promotion_categories)
  @JoinColumn({ name: "store_id" })
  store: Store;

  @OneToMany(() => PromotionPromotionCategory, (promotionPromotionCategory) => promotionPromotionCategory.promotion_category)
  promotion_promotion_categories: PromotionPromotionCategory[];
}

export default PromotionCategory;
