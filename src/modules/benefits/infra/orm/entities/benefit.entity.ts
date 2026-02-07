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
import Store from "../../../../stores/infra/orm/entities/store.entity";
import UserBenefit from "./user-benefit.entity";

@Entity({ name: "benefits" })
class Benefit {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  score_required: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Store, (store) => store.benefits)
  @JoinColumn({ name: "store_id" })
  store: Store;

  @OneToOne(() => Image, (image) => image.benefit, { nullable: true })
  @JoinColumn({ name: "image_id" })
  image: Image;

  @OneToMany(() => UserBenefit, (userBenefit) => userBenefit.benefit)
  user_benefits: UserBenefit[];
}

export default Benefit;
