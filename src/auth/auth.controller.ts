import {
  Body,
  Post,
  Controller,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentailDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentailDto: AuthCredentailDto) {
    return this.authService.signUp(authCredentailDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentailDto: AuthCredentailDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentailDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
