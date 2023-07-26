import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsdtPrice } from './entities/usdt-price.entity';
import { HttpModule } from '@nestjs/axios';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsdtPrice]), HttpModule, ScheduleModule.forRoot()],
  controllers: [CurrencyController],
  providers: [CurrencyService, CronService],
  exports: [],
})
export class CurrencyModule {}
