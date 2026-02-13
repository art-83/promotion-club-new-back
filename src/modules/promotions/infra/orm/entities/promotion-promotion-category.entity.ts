import { CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn, Entity } from "typeorm";
import PromotionCategory from "./promotion-category.entity";
import Promotion from "./promotion.entity";

@Entity({ name: "promotions_promotion_categories" })
class PromotionPromotionCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotion_promotion_categories)
  @JoinColumn({ name: "promotion_id" })
  promotion: Promotion;

  @ManyToOne(() => PromotionCategory, (promotionCategory) => promotionCategory.promotion_promotion_categories)
  @JoinColumn({ name: "promotion_category_id" })
  promotion_category: PromotionCategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default PromotionPromotionCategory;
