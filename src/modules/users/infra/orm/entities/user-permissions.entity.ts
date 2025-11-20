import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import Store from "../../../../stores/infra/orm/entities/store.entity";

@Entity({ name: "user_permissions" })
class UserPermissions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", array: true, nullable: true })
  permissions: string[];

  @ManyToOne(() => Store, (store) => store.user_permissions, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "store_id" })
  store: Store;

  // relations
  @OneToOne(() => User, (user) => user.user_permissions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;
}

export default UserPermissions;
