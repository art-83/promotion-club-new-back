import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "../../../../users/infra/orm/entities/user.entity";
import StoreRating from "./store-rating.entity";

@Entity({ name: "store_rating_responses" })
class StoreRatingResponse {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.store_rating_responses)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => StoreRating, (store_rating) => store_rating.store_rating_responses)
  @JoinColumn({ name: "store_rating_id" })
  store_rating: StoreRating;
}

export default StoreRatingResponse;
