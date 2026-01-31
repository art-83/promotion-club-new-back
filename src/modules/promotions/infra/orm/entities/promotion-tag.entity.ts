import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Promotion from "./promotion.entity";
import Tag from "./tag.entity";

@Entity({ name: "promotion_tags" })
class PromotionTag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotion_tags)
  @JoinColumn({ name: "promotion_id" })
  promotion: Promotion;

  @ManyToOne(() => Tag, (tag) => tag.promotion_tags)
  @JoinColumn({ name: "tag_id" })
  tag: Tag;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default PromotionTag;
