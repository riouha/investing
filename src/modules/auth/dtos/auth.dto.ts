import { IsPhoneNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsPhoneNumber('IR')
  mobile: string;

  @IsString()
  password: string;
}

export class SignupDto {
  @IsPhoneNumber('IR')
  mobile: string;

  @IsString()
  password: string;
}
