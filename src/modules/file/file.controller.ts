import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './services/file.service';
import { join } from 'path';
import { createReadStream } from 'fs';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '~/common/decorators/get-user.decorator';
import { ITokenPayload } from '../auth/types/token.interface';
import AccessTokenGuard from '../auth/guards/access-token.guard';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(AccessTokenGuard)
  @Post('/image')
  @UseInterceptors(
    FileInterceptor('file', {
      //   storage: diskStorage({
      //     destination: './files',
      // filename: (req, file, callback) => {
      //   const name = file.originalname.split('.')[0];
      //   const fileExtName = extname(file.originalname);
      //   const randomName = Array(4)
      //     .fill(null)
      //     .map(() => Math.round(Math.random() * 16).toString(16))
      //     .join('');
      //   callback(null, `${name}-${randomName}${fileExtName}`);
      // },
      //   }),
      // fileFilter: (req, file, callback) => {
      //   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      //     return callback(new Error('Only image files are allowed!'), false);
      //   }
      //   callback(null, true);
      // },
    }),
  )
  async uploadImage(@GetUser() token: ITokenPayload, @UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('no file uploaded');
    return this.fileService.saveImage(file, token.sub);
  }

  @Get('/gallery')
  async getGallery() {
    const result = await this.fileService.getGallery();
    return { result };
  }

  @Get('/:path')
  downloadFile(@Param('path') path: string): StreamableFile {
    console.log('###############################', path);

    const file = createReadStream(join(process.cwd(), 'uploads', path));
    return new StreamableFile(file, { type: 'image', disposition: 'inline' });

    // return res.sendFile(path, { root: join(__dirname, '../../../uploads') });
  }
}
