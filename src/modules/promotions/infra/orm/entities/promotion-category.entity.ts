import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import PromotionPromotionCategory from "./promotion-promotion-category.entity";

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

  @OneToMany(() => PromotionPromotionCategory, (promotionPromotionCategory) => promotionPromotionCategory.promotion_category)
  promotion_promotion_categories: PromotionPromotionCategory[];
}

export default PromotionCategory;
