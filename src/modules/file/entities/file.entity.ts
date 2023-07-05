import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filepath: string;

  @Column()
  name: string;

  @Column({ type: 'int8', nullable: true })
  size: number;

  @Column()
  mimetype: string;

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //   @Column()
  //   createUserId: number;
  //   @ManyToOne(() => User)
  //   createUser: User;
  @CreateDateColumn({ type: 'timestamp' })
  createDate: Date;

  constructor(filepath: string, mimetype: string, size: number) {
    this.filepath = filepath;
    this.mimetype = mimetype;
    this.size = size;
  }
}
