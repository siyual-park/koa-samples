import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
class Todo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn({ type: "time" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "time" })
  updatedAt!: Date;
}

export default Todo;
