import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Store from "../../../../stores/infra/orm/entities/store.entity";
import Promotion from "../../../../promotions/infra/orm/entities/promotion.entity";

@Entity({ name: "images" })
class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToOne(() => Store, (store) => store.image)
  store: Store;

  @OneToOne(() => Promotion, (promotion) => promotion.image)
  promotion: Promotion;
}

export default Image;
