import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsIn(['Draft', 'Published'])
  status?: 'Draft' | 'Published';

  @IsString()
  content: string;
  @IsString()
  htmlContent: string;

  @IsString()
  thumbnail: string;
}

export class SearchPostsDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  pageSize?: number;
}
