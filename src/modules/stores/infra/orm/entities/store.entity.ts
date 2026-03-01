import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import File from "../../../../files/infra/orm/entities/file.entity";
import UserPermissions from "../../../../users/infra/orm/entities/user-permissions.entity";
import Promotion from "../../../../promotions/infra/orm/entities/promotion.entity";
import Tag from "../../../../promotions/infra/orm/entities/tag.entity";
import StoreStoreCategory from "./store-store-category.entity";
import Invoice from "../../../../invoices/infra/orm/entities/invoice.entity";
import UserStoreOptions from "../../../../users/infra/orm/entities/user-store-options.entity";
import StoreRating from "./store-rating.entity";

@Entity({ name: "stores" })
class Store {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  invoice_taxes_percentage: number;

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

  @DeleteDateColumn()
  deleted_at: Date;

  // relations
  @OneToOne(() => File)
  @JoinColumn({ name: "file_id" })
  file: File;

  @OneToMany(() => Promotion, (promotion) => promotion.store)
  promotions: Promotion[];

  @OneToMany(() => UserPermissions, (user_permissions) => user_permissions.store)
  user_permissions: UserPermissions[];

  @OneToMany(() => Tag, (tag) => tag.store)
  tags: Tag[];

  @OneToMany(() => StoreStoreCategory, (storeStoreCategory) => storeStoreCategory.store)
  store_store_categories: StoreStoreCategory[];

  @OneToMany(() => Invoice, (invoice) => invoice.store)
  invoices: Invoice;

  @OneToMany(() => UserStoreOptions, (user_store_options) => user_store_options.store)
  user_store_options: UserStoreOptions[];

  @OneToMany(() => StoreRating, (store_rating) => store_rating.store)
  store_ratings: StoreRating[];
}

export default Store;
