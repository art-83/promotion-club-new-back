import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

@Entity({ name: "user_permissions" })
class UserPermissions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", array: true, nullable: true })
  permissions: string[];

  // relations
  @OneToOne(() => User, (user) => user.user_permissions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;
}

export default UserPermissions;
