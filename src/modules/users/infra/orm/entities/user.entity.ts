import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import UserPermissions from "./user-permissions.entity";
import Store from "../../../../stores/infra/orm/entities/store.entity";
import PromotionTicket from "../../../../tickets/infra/orm/entities/promotion-ticket.entity";
import UserPushToken from "./user-push-token.entity";
import UserStoreOptions from "./user-store-options.entity";

@Entity({ name: "users" })
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ type: "decimal", default: 0 })
  score: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // relations
  @OneToOne(() => UserPermissions, (user_permissions) => user_permissions.user)
  user_permissions: UserPermissions;

  @OneToMany(() => PromotionTicket, (promotional_ticket) => promotional_ticket.user)
  promotional_ticket: PromotionTicket[];

  @OneToMany(() => UserPushToken, (user_push_token) => user_push_token.user)
  user_push_token: UserPushToken[];

  @OneToMany(() => UserStoreOptions, (user_store_options) => user_store_options.user)
  user_store_options: UserStoreOptions[];
}

export default User;
