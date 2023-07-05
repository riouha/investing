import { Body, Controller, Get, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/post.dto';
import { Param } from '@nestjs/common/decorators';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:slug')
  async getPostBySlug(@Param('slug') slug: string) {
    return this.postService.getPostBySlug(slug);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async searchPosts() {
    return this.postService.sarchPosts();
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  @Post('/')
  async createPost(@Body() dto: CreatePostDto) {
    return this.postService.createPost(dto);
  }
}
