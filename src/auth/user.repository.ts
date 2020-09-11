import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentailDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentailDto: AuthCredentailDto): Promise<void> {
    const { username, password } = authCredentailDto;

    try {
      const user = new User();
      user.username = username;
      user.password = password;

      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username already exists');
      }
    }
  }
}
