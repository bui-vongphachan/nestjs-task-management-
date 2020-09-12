import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentailDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentailDto: AuthCredentailDto): Promise<void> {
    const { username, password } = authCredentailDto;
    try {
      const user = new User();
      const salt = await bcrypt.genSalt(9);

      user.username = username;
      user.password = await bcrypt.hash(password, salt);

      await user.save();
    } catch (error) {
      console.log(error);

      if (error.code === 11000) {
        throw new ConflictException('Username already exists');
      }

      throw new InternalServerErrorException();
    }
  }

  async signIn(authCredentailDto: AuthCredentailDto): Promise<Object> {
    try {
      const { username, password } = authCredentailDto;
      const user = await this.findOne({ username: username });
      const result = await bcrypt.compare(password, user.password);
      if (result === false) {
        throw new NotFoundException();
      }
      return user;
    } catch (error) {
      return error;
    }
  }
}
