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
import UserPermissions from "./user-permissions.entity";
import PromotionTicket from "../../../../tickets/infra/orm/entities/promotion-ticket.entity";
import UserPushToken from "./user-push-token.entity";
import UserBenefit from "../../../../benefits/infra/orm/entities/user-benefit.entity";
import UserStoreOptions from "./user-store-options.entity";
import StoreRating from "../../../../stores/infra/orm/entities/store-rating.entity";
import StoreRatingResponse from "../../../../stores/infra/orm/entities/store-rating-response.entity";

@Entity({ name: "users" })
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ type: "decimal", default: 0 })
  score: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // relations
  @OneToOne(() => UserPermissions, (user_permissions) => user_permissions.user)
  user_permissions: UserPermissions;

  @OneToMany(() => PromotionTicket, (promotion_ticket) => promotion_ticket.user)
  promotion_ticket: PromotionTicket[];

  @OneToMany(() => UserPushToken, (user_push_token) => user_push_token.user)
  user_push_token: UserPushToken[];

  @OneToMany(() => UserStoreOptions, (user_store_options) => user_store_options.user)
  user_store_options: UserStoreOptions[];

  @OneToMany(() => UserBenefit, (user_benefit) => user_benefit.user)
  user_benefits: UserBenefit[];

  @OneToMany(() => StoreRating, (store_rating) => store_rating.user)
  store_ratings: StoreRating[];

  @OneToMany(() => StoreRatingResponse, (store_rating_response) => store_rating_response.user)
  store_rating_responses: StoreRatingResponse[];
}

export default User;
