import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@Unique('UNQ_src_link', ['source', 'link'])
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, generated: 'uuid' })
  slug: string;

  @Column()
  title: string;

  @Column()
  type: 'Post' | 'Article' | 'News' | 'RssPost' | 'RssNews';

  @Column({ default: 'Draft' })
  status: 'Draft' | 'Published';

  @Column({ nullable: true })
  content?: string;
  @Column({ nullable: true })
  htmlContent?: string;

  @Column()
  thumbnail: string;

  //#region seo
  @Column({ nullable: true })
  thumbnailAlt?: string;
  @Column({ nullable: true })
  seoTitle?: string;
  @Column({ nullable: true })
  seoText?: string;
  @Column({ type: 'simple-array', nullable: true })
  keywords?: string[];
  //#endregion

  @ManyToMany(() => Category)
  @JoinTable({ name: 'post_categories' })
  categories: Category[];

  @Column({ nullable: true })
  source?: string;
  @Column({ nullable: true })
  link?: string;

  //-------------
  @Column({ nullable: true })
  publishDate?: Date;

  //########################################
  @Column({ nullable: true })
  createUserId?: number;
  @ManyToOne(() => User)
  createUser?: User;

  // @Transform(({ value }) => Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(value))
  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
}
