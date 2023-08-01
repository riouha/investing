import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto, SearchPostsDto } from './dtos/post.dto';
import { pageToOffsetLimit } from '~/common/utils';
import { CategoryService } from '../category/category.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private readonly categoryService: CategoryService,
  ) {}

  async searchPosts(dto: SearchPostsDto) {
    const { offset, limit } = pageToOffsetLimit(dto.page ?? 1, dto.pageSize ?? 100);
    const [posts, count] = await this.postRepo.findAndCount({
      where: { type: In(['Post', 'RssPost']), status: 'Published' },
      relations: ['createUser'],
      order: { publishDate: 'DESC' },
      take: limit,
      skip: offset,
    });
    return {
      posts,
      count,
    };
  }

  async searchPosts2(dto: SearchPostsDto) {
    const query = this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.createUser', 'createUser')
      .orderBy('post.publishDate', 'DESC');

    if (dto.categoryId) {
      query.leftJoin('post.categories', 'categories').andWhere('categories.id = :catid', { catid: dto.categoryId });
    }

    if (dto.status) {
      query.andWhere('post.status= :status', { status: dto.status });
    }

    if (dto.page) {
      const { offset, limit } = pageToOffsetLimit(dto.page ?? 1, dto.pageSize ?? 100);
      query.offset(offset);
      query.limit(limit);
    }
    const [posts, count] = await query.getManyAndCount();
    return {
      count,
      posts,
    };
  }

  async createPost(dto: CreatePostDto, userId: number) {
    const post = this.postRepo.create(dto);
    if (dto.categoryIds?.length) {
      const categories = await this.categoryService.searchCategories(dto.categoryIds);
      if (categories.length !== new Set(dto.categoryIds).size) throw new NotFoundException('invalid category ids');
      post.categories = categories;
    }
    // post.slug = Date.now().toString();
    post.type = 'Post';
    post.createUserId = userId;
    return this.postRepo.save(post);
  }

  async getPostBySlug(slug: string) {
    const post = await this.postRepo.findOne({ where: { slug } });
    if (!post) throw new NotFoundException('post not found');
    return post;
  }

  async getPost(id: number) {
    const post = await this.postRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('post not found');
    return post;
  }

  async deletePost(id: number) {
    return this.postRepo.delete(id);
  }
}
