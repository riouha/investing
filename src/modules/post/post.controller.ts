import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, SearchPostsDto } from './dtos/post.dto';
import { Param, Query, UseGuards } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import AccessTokenGuard from '../auth/guards/access-token.guard';
import { ITokenPayload } from '../auth/types/token.interface';
import { GetUser } from '~/common/decorators/get-user.decorator';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get('/slug/:slug')
  async getPostBySlug(@Param('slug') slug: string) {
    return this.postService.getPostBySlug(slug);
  }

  @Get('/:id')
  async getPostById(@Param('id') id: number) {
    return this.postService.getPost(id);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async searchPosts(@Query() dto: SearchPostsDto) {
    return this.postService.sarchPosts(dto);
  }

  // @UseInterceptors(ClassSerializerInterceptor)

  @ApiBearerAuth('Access-Token')
  @UseGuards(AccessTokenGuard)
  @Post('/')
  async createPost(@GetUser() token: ITokenPayload, @Body() dto: CreatePostDto) {
    return this.postService.createPost(dto, token.sub);
  }
}
