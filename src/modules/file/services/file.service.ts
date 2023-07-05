import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { File } from '../entities/file.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepo: Repository<File>,
    private readonly configService: ConfigService,
  ) {}

  async saveImage(file: Express.Multer.File) {
    const fileModel = this.fileRepo.create({
      name: file.originalname,
      filepath: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    });
    return this.fileRepo.save(fileModel);
  }

  async getGallery() {
    const images = await this.fileRepo.find({ where: { mimetype: ILike('image%') } });
    return images.map((img) => ({
      id: img.id,
      filepath: img.filepath,
      src: `http://${this.configService.get('app.url')}:${this.configService.get('app.port')}/file/${img.filepath}`,
      name: img.name,
    }));
  }
}
