import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "../../../../users/infra/orm/entities/user.entity";
import Store from "./store.entity";
import StoreRatingResponse from "./store-rating-response.entity";

@Entity({ name: "store_ratings" })
class StoreRating {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  rating: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.store_ratings)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Store, (store) => store.store_ratings)
  @JoinColumn({ name: "store_id" })
  store: Store;

  @OneToMany(() => StoreRatingResponse, (store_rating_response) => store_rating_response.store_rating)
  store_rating_responses: StoreRatingResponse[];
}

export default StoreRating;
