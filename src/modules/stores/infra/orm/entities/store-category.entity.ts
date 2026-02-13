import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import StoreStoreCategory from "./store-store-category.entity";

@Entity({ name: "store_categories" })
class StoreCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => StoreStoreCategory, (storeStoreCategory) => storeStoreCategory.category)
  store_store_categories: StoreStoreCategory[];
}

export default StoreCategory;
