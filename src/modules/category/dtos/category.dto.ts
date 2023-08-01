import { IsOptional, IsString } from 'class-validator';

export class AddCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
