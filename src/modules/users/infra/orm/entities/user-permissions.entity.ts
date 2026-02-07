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
import User from "./user.entity";
import Store from "../../../../stores/infra/orm/entities/store.entity";

@Entity({ name: "user_permissions" })
class UserPermissions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", array: true, nullable: true })
  permissions: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Store, (store) => store.user_permissions, { nullable: true })
  @JoinColumn({ name: "store_id" })
  store: Store | null;

  @OneToOne(() => User, (user) => user.user_permissions)
  @JoinColumn({ name: "user_id" })
  user: User;
}

export default UserPermissions;
