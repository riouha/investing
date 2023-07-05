import { IsIn, IsOptional, IsString } from 'class-validator';

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
