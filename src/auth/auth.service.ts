import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentailDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  signUp(authCredentailDto: AuthCredentailDto): Promise<void> {
    return this.userRepository.signUp(authCredentailDto);
  }

  signIn(authCredentailDto: AuthCredentailDto) {
    return this.userRepository.signIn(authCredentailDto);
  }
}
