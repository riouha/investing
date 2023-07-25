import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto, SearchPostsDto } from './dtos/post.dto';
import { pageToOffsetLimit } from '~/common/utils';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async sarchPosts(dto: SearchPostsDto) {
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

  async createPost(dto: CreatePostDto, userId: number) {
    const post = this.postRepo.create(dto);
    post.type = 'Post';
    // post.slug = Date.now().toString();
    post.createUserId = userId;
    return this.postRepo.save(post);
  }

  async getPostBySlug(slug: string) {
    const post = this.postRepo.findOne({ where: { slug } });
    if (!post) throw new NotFoundException('post not found');
    return post;
  }

  async getPost(id: number) {
    const post = this.postRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('post not found');
    return post;
  }
}
