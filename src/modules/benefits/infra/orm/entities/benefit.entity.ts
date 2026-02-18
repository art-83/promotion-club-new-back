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
import File from "../../../../files/infra/orm/entities/file.entity";
import UserBenefit from "./user-benefit.entity";
import BenefitTier from "./benefit-tier.entity";

@Entity({ name: "benefits" })
class Benefit {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  points_required: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => BenefitTier, (benefitTier) => benefitTier.benefits)
  @JoinColumn({ name: "benefit_tier_id" })
  benefit_tier: BenefitTier;

  @OneToOne(() => File, (file) => file.benefit, { nullable: true })
  @JoinColumn({ name: "file_id" })
  file: File;

  @OneToMany(() => UserBenefit, (userBenefit) => userBenefit.benefit)
  user_benefits: UserBenefit[];
}

export default Benefit;
