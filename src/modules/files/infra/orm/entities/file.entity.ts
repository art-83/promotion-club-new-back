import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Store from "../../../../stores/infra/orm/entities/store.entity";
import Promotion from "../../../../promotions/infra/orm/entities/promotion.entity";
import Benefit from "../../../../benefits/infra/orm/entities/benefit.entity";
import Invoice from "../../../../invoices/infra/orm/entities/invoice.entity";

@Entity({ name: "files" })
class File {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToOne(() => Store, (store) => store.file)
  store: Store;

  @OneToOne(() => Promotion, (promotion) => promotion.file)
  promotion: Promotion;

  @OneToOne(() => Benefit, (benefit) => benefit.file)
  benefit: Benefit;

  @OneToOne(() => Invoice, (invoice) => invoice.file)
  invoice: Invoice;
}

export default File;
