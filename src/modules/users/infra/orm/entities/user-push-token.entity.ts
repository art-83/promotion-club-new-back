import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./user.entity";

@Entity({ name: "user_push_tokens" })
class UserPushToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Column()
  token: string;

  @Column({ nullable: true })
  platform: string;

  @Column({ nullable: true })
  os_version: string;

  @Column({ nullable: true })
  manufacturer: string;

  @Column({ nullable: true })
  device_name: string;

  @Column({ nullable: true })
  device_model: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToOne(() => User, (user) => user.user_push_token)
  @JoinColumn({ name: "user_id" })
  user: User;
}

export default UserPushToken;
