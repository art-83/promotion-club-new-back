import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import User from "../../../../users/infra/orm/entities/user.entity";
import Benefit from "./benefit.entity";

@Entity({ name: "user_benefits" })
class UserBenefit {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.user_benefits)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Benefit, (benefit) => benefit.user_benefits)
  @JoinColumn({ name: "benefit_id" })
  benefit: Benefit;
}

export default UserBenefit; 