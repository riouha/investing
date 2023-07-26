import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';
import { SearchCurrencyDto } from './dtos/currency.dto';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}
  @Get('/test')
  async test(@Query() dto: SearchCurrencyDto) {
    const [data, count] = await this.currencyService.getPrices(dto);
    return {
      count,
      data,
    };
  }
}
