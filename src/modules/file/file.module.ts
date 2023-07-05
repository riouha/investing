import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { File } from './entities/file.entity';
import { FileController } from './file.controller';
import { FileService } from './services/file.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      dest: join(__dirname, '../../../uploads'),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
