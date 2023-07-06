import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { PostModule } from './modules/post/post.module';
import { CategoryModule } from './modules/category/category.module';
import { FileModule } from './modules/file/file.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          type: 'postgres',
          host: configService.get('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.dbname'),
          logging: configService.get<Array<string>>('database.logLevel'),
          entities: configService.get<Array<string>>('database.entities'),
          // autoLoadEntities: configService.get<boolean>('database.autoLoadEntities'),
          synchronize: true, //configService.get<boolean>('database.synchronize'),
          // dropSchema: configService.get<boolean>('database.dropSchema'),
        } as PostgresConnectionOptions),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PostModule,
    CategoryModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
