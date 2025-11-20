import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "../../../../users/infra/orm/entities/user.entity";
import Product from "../../../../promotions/infra/orm/entities/product.entity";
import Image from "../../../../images/infra/orm/entities/image.entity";
import UserPermissions from "../../../../users/infra/orm/entities/user-permissions.entity";

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
  @OneToOne(() => Image, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "image_id" })
  image: Image;

  @OneToMany(() => Product, (product) => product.store)
  products: Product[];

  @OneToMany(() => UserPermissions, (user_permissions) => user_permissions.store)
  user_permissions: UserPermissions[];
}

export default Store;
