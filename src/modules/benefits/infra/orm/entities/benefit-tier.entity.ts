import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Benefit from "./benefit.entity";

@Entity({ name: "benefit_tiers" })
class BenefitTier {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  minimum_points: number;

  @Column()
  maximum_points: number;

  @Column()
  color_hex: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Benefit, (benefit) => benefit.benefit_tier)
  benefits: Benefit[];
}

export default BenefitTier;
