import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Store from "../../../../stores/infra/orm/entities/store.entity";
import Product from "../../../../promotions/infra/orm/entities/product.entity";

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

  @OneToOne(() => Store, (store) => store.image)
  store: Store;

  @OneToOne(() => Product, (product) => product.image)
  product: Product;
}

export default Image;
