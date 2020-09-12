import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentailDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtSerivce: JwtService,
  ) {}

  signUp(authCredentailDto: AuthCredentailDto): Promise<void> {
    return this.userRepository.signUp(authCredentailDto);
  }
  async signIn(
    authCredentailDto: AuthCredentailDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.signIn(authCredentailDto);
    if (!user) throw new NotFoundException();

    const payload = { user };
    const accessToken = this.jwtSerivce.sign(payload);

    return { accessToken };
  }
}
