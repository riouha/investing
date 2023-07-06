import { IsPhoneNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsPhoneNumber('IR')
  username: string;

  @IsString()
  password: string;
}

export class SignupDto {
  @IsPhoneNumber('IR')
  phone: string;

  @IsString()
  password: string;
}
