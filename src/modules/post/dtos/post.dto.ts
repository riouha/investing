import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @IsInt({ each: true })
  categoryIds?: number[];
}

export class SearchPostsDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  pageSize?: number;

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsIn(['Published', 'Draft'])
  status?: 'Draft' | 'Published';
}
