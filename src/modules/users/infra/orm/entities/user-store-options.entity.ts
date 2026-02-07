import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import User from "./user.entity";
import Store from "../../../../stores/infra/orm/entities/store.entity";

@Entity({ name: "user_store_options" })
class UserStoreOptions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.user_store_options)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Store, (store) => store.user_store_options)
  @JoinColumn({ name: "store_id" })
  store: Store;
}

export default UserStoreOptions;
