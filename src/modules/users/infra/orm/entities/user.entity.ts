import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserPermissions from "./user-permissions.entity";
import Store from "../../../../stores/infra/orm/entities/store.entity";
import PromotionTicket from "../../../../tickets/infra/orm/entities/promotion-ticket.entity";

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

  @Column({ default: 0 })
  score: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // joins
  @ManyToOne(() => Store, (store) => store.users, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "store_id" })
  store: Store;

  // relations
  @OneToOne(() => UserPermissions, (user_permissions) => user_permissions.user)
  user_permissions: UserPermissions;

  @OneToMany(() => PromotionTicket, (promotional_ticket) => promotional_ticket.user)
  promotional_ticket: PromotionTicket[];
}

export default User;
