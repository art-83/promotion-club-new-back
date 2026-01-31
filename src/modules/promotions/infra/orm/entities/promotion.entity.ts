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
import Image from "../../../../images/infra/orm/entities/image.entity";
import PromotionTag from "./promotion-tag.entity";

@Entity({ name: "promotions" })
class Promotion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

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

  @ManyToOne(() => Store, (store) => store.promotions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "store_id" })
  store: Store;

  @OneToOne(() => Image, (image) => image.promotion, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "image_id" })
  image: Image;

  @OneToMany(() => PromotionTag, (promotionTag) => promotionTag.promotion)
  promotion_tags: PromotionTag[];
}

export default Promotion;
