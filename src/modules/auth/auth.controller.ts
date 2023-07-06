import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, SignupDto } from './dtos/auth.dto';
import RefreshTokenGuard from './guards/refresh-token.guard';
import { AuthService } from './services/auth.service';
import { IRefreshTokenPayload } from './types/token.interface';
import { IsPublic } from '~/common/decorators/is-public.decorator';
import { GetUser } from '~/common/decorators/get-user.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('/login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @IsPublic()
  @Post('/signup')
  async signup(@Body() body: SignupDto) {
    const user = await this.authService.signup(body);
    return { user };
  }

  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  async refreshToken(@GetUser() refreshToken: IRefreshTokenPayload) {
    const accessToken = await this.authService.refreshToken(refreshToken.sub);
    return { accessToken };
  }
}
