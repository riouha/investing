import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import AccessTokenGuard from './guards/access-token.guard';
import RefreshTokenGuard from './guards/refresh-token.guard';
import { AccessTokenStrategy } from './guards/access-token.strategy';
import { RefreshTokeStrategy } from './guards/refresh-token.strategy';

@Module({
  imports: [JwtModule.register({}), ConfigModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenGuard, RefreshTokenGuard, AccessTokenStrategy, RefreshTokeStrategy],
  exports: [AccessTokenGuard, RefreshTokenGuard],
})
export class AuthModule {}
