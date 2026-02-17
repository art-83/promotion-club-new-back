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
import Image from "../../../../images/infra/orm/entities/image.entity";
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

  @OneToOne(() => Image, (image) => image.benefit, { nullable: true })
  @JoinColumn({ name: "image_id" })
  image: Image;

  @OneToMany(() => UserBenefit, (userBenefit) => userBenefit.benefit)
  user_benefits: UserBenefit[];
}

export default Benefit;
