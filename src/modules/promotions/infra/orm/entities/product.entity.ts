import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Promotion from "./promotion.entity";
import Store from "../../../../stores/infra/orm/entities/store.entity";
import Image from "../../../../images/infra/orm/entities/image.entity";

@Entity({ name: "products" })
class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // relations
  @ManyToOne(() => Store, (store) => store.products)
  @JoinColumn({ name: "store_id" })
  store: Store;

  @OneToOne(() => Image, (image) => image.product, {
    onDelete: "CASCADE",
  })
  image: Image;

  @OneToOne(() => Promotion, (promotion) => promotion.product)
  promotion: Promotion;
}

export default Product;
