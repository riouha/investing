import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsdtPrice } from './entities/usdt-price.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { SearchCurrencyDto } from './dtos/currency.dto';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(UsdtPrice) private readonly usdtRepo: Repository<UsdtPrice>,
    private readonly httpService: HttpService,
  ) {}

  async getPrices(dto: SearchCurrencyDto) {
    return this.usdtRepo.findAndCount({
      where: {
        ...(dto.price && { price: dto.price }),
      },
      skip: dto.offset ?? 0,
      take: dto.limit ?? 100,
    });
  }
  async savePrice(price: number, datetime: Date) {
    return this.usdtRepo.save(this.usdtRepo.create({ price, datetime }));
  }

  async getPrice() {
    try {
      const result = await this.httpService.axiosRef.get(
        'https://api.nobitex.ir/market/stats?srcCurrency=usdt&dstCurrency=rls,usdt',
      );
      if (result?.data?.stats['usdt-rls'])
        return {
          datetime: new Date(),
          price: result?.data?.stats['usdt-rls'].latest,
        };
      else throw new Error('!');
    } catch (err) {
      console.log('error in get prices', err);
      if (err.message == '!') return { price: 0, datetime: new Date() };
      return { price: -1, datetime: new Date() };
    }
  }
}
