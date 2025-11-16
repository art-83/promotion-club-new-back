import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "../../../../users/infra/orm/entities/user.entity";
import Product from "../../../../promotions/infra/orm/entities/product.entity";

@Entity({ name: "stores" })
class Store {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // relations
  @OneToMany(() => User, (user) => user.store)
  users: User[];

  @OneToMany(() => Product, (product) => product.store)
  products: Product[];
}

export default Store;
