import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  //########################################
  @Column({ nullable: true })
  userId?: number;
  @Transform(({ value }) => Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(value))
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updateDate: Date;
}
