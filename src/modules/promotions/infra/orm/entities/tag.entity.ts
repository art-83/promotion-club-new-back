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
import Store from "../../../../stores/infra/orm/entities/store.entity";
import PromotionTag from "./promotion-tag.entity";

@Entity({ name: "tags" })
class Tag {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Store, (store) => store.tags)
  @JoinColumn({ name: "store_id" })
  store: Store;

  @OneToMany(() => PromotionTag, (promotionTag) => promotionTag.tag)
  promotion_tags: PromotionTag[];
}

export default Tag;
