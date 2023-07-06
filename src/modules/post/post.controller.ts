import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/post.dto';
import { Param, UseGuards } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import AccessTokenGuard from '../auth/guards/access-token.guard';
import { ITokenPayload } from '../auth/types/token.interface';
import { GetUser } from '~/common/decorators/get-user.decorator';

@ApiTags('post')
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

  @ApiBearerAuth('Access-Token')
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  @Post('/')
  async createPost(@GetUser() token: ITokenPayload, @Body() dto: CreatePostDto) {
    return this.postService.createPost(dto, token.sub);
  }
}
