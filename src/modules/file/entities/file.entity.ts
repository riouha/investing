import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '~/modules/user/entities/user.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filepath: string;

  @Column()
  filename: string;

  @Column({ type: 'int8', nullable: true })
  size: number;

  @Column()
  mimetype: string;

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  @Column()
  createUserId: number;
  @ManyToOne(() => User)
  createUser: User;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: Date;
}
