import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Product from "./product.entity";

@Entity({ name: "promotions" })
class Promotion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @OneToOne(() => Product, (product) => product.promotion, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;
}

export default Promotion;
