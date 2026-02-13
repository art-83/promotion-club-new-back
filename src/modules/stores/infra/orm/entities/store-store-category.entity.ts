import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Store from "./store.entity";
import StoreCategory from "./store-category.entity";

@Entity({ name: "stores_store_categories" })
class StoreStoreCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Store, (store) => store.store_store_categories)
  @JoinColumn({ name: "store_id" })
  store: Store;

  @ManyToOne(() => StoreCategory, (storeCategory) => storeCategory.store_store_categories)
  @JoinColumn({ name: "category_id" })
  category: StoreCategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default StoreStoreCategory;
