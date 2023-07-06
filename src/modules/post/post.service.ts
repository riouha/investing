import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dtos/post.dto';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async sarchPosts() {
    return this.postRepo.find({
      where: { type: In(['Post', 'RssPost']), status: 'Published' },
      relations: ['createUser'],
      order: { publishDate: 'DESC' },
    });
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
}
