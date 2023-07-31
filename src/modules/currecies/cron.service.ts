import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CurrencyService } from './currency.service';

@Injectable()
export class CronService {
  constructor(private readonly currencyService: CurrencyService) {}

  // @Cron(CronExpression.EVERY_MINUTE)
  // async handleCron() {
  //   console.log('Add New Price');
  //   const data = await this.currencyService.getPrice();
  //   if (data) await this.currencyService.savePrice(data.price, data.datetime);
  // }
}
