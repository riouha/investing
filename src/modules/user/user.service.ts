import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, SignupDto } from '../auth/dtos/auth.dto';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async getUserById(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException();
    return user;
  }
  async createUser(dto: SignupDto) {
    const duplicate = await this.userRepo.findOne({ where: { phone: dto.phone }, select: { id: true } });
    if (duplicate) throw new ConflictException('phone is duplicate');

    const user = new User();
    user.phone = dto.phone;
    user.password = await this.hashPassword(dto.password);
    return this.userRepo.save(user);
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { phone: dto.username } });
    if (!user) throw new UnauthorizedException('incorrect user or password');

    const isValid = await this.validatePassword(user.password, dto.password);
    if (!isValid) throw new UnauthorizedException('incorrect user or password');
    return user;
  }

  private async hashPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await promisify(scrypt)(password, salt, 64)) as Buffer;
    return `${buffer.toString('hex')}.${salt}`;
  }

  private async validatePassword(hashedPassword: string, password: string) {
    const [hash, salt] = hashedPassword.split('.');
    const buffer = (await promisify(scrypt)(password, salt, 64)) as Buffer;
    return buffer.toString('hex') === hash;
  }
}
