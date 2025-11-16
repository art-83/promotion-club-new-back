import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

  // relations
  @OneToOne(() => Product, (product) => product.image, {
    nullable: false,
  })
  @JoinColumn({ name: "product_id" })
  product: Product;
}

export default Image;
