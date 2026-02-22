import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Store from "../../../../stores/infra/orm/entities/store.entity";
import File from "../../../../files/infra/orm/entities/file.entity";

@Entity({ name: "invoices" })
class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  was_paid: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Store, (store) => store.invoices, { nullable: true })
  @JoinColumn({ name: "store_id" })
  store: Store;

  @OneToOne(() => File, (file) => file.invoice)
  @JoinColumn({ name: "file_id" })
  file: File;
}

export default Invoice;
