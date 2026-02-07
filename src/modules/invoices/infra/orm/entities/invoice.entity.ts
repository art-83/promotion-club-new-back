import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Store from "../../../../stores/infra/orm/entities/store.entity";

@Entity({ name: "invoices" })
class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Store, (store) => store.invoices, { nullable: true })
  @JoinColumn({ name: "store_id" })
  store: Store;
}

export default Invoice;
