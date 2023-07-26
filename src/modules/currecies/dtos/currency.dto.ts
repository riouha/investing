import { IsInt, IsOptional } from 'class-validator';

export class SearchCurrencyDto {
  @IsOptional()
  @IsInt()
  offset?: number;

  @IsOptional()
  @IsInt()
  limit?: number;

  @IsOptional()
  @IsInt()
  price?: number;
}
