import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsdtPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  datetime: Date;

  @CreateDateColumn()
  createDate: Date;
}
