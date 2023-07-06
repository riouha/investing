import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IRefreshTokenPayload, ITokenPayload } from '../types/token.interface';
import { LoginDto, SignupDto } from '../dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signup(dto: SignupDto) {
    return this.userService.createUser(dto);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.validateUser(dto);

    // generate tokens
    const [accessToken, refreshToken] = await Promise.all([
      this.getAccessToken({
        sub: user.id,
        phone: user.phone,
        active: user.isActive,
      }),
      this.getRefreshToken({ sub: user.id }),
    ]);

    return { access_token: accessToken, refresh_token: refreshToken, user };
  }

  async refreshToken(id: number) {
    const user = await this.userService.getUserById(id);
    return this.getAccessToken({
      sub: user.id,
      phone: user.phone,
      active: user.isActive,
    });
  }

  //#region  private routes
  private async getAccessToken(payload: ITokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('auth.accessTokenSecret'),
      expiresIn: '1d', // this.configService.get<string>('auth.accessTokenExpiration'),
    });
  }

  private async getRefreshToken(payload: IRefreshTokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('auth.refreshTokenSecret'),
      expiresIn: this.configService.get<string>('auth.refreshTokenExpiration'),
    });
  }
  //#endregion
}
