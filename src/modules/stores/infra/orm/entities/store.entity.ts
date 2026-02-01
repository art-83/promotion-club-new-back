import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Image from "../../../../images/infra/orm/entities/image.entity";
import UserPermissions from "../../../../users/infra/orm/entities/user-permissions.entity";
import PromotionTicket from "../../../../tickets/infra/orm/entities/promotion-ticket.entity";
import Promotion from "../../../../promotions/infra/orm/entities/promotion.entity";
import Tag from "../../../../promotions/infra/orm/entities/tag.entity";
import StoreCategory from "./store-category.entity";
import Invoice from "../../../../invoices/infra/orm/entities/invoice.entity";

@Entity({ name: "stores" })
class Store {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // relations
  @OneToOne(() => Image, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "image_id" })
  image: Image;

  @OneToMany(() => Promotion, (promotion) => promotion.store)
  promotions: Promotion[];

  @OneToMany(() => UserPermissions, (user_permissions) => user_permissions.store)
  user_permissions: UserPermissions[];

  @OneToMany(() => PromotionTicket, (promotion_tickets) => promotion_tickets.store)
  promotion_tickets: PromotionTicket[];

  @OneToMany(() => Tag, (tag) => tag.store)
  tags: Tag[];

  @OneToMany(() => StoreCategory, (storeCategory) => storeCategory.store)
  store_categories: StoreCategory[];

  @OneToMany(() => Invoice, (invoice) => invoice.store)
  invoices: Invoice;
}

export default Store;
