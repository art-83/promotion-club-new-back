import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Store from "./store.entity";
import Category from "./category.entity";

@Entity({ name: "store_categories" })
class StoreCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Store, (store) => store.store_categories, { onDelete: "CASCADE" })
  @JoinColumn({ name: "store_id" })
  store: Store;

  @ManyToOne(() => Category, (category) => category.store_categories, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default StoreCategory;
