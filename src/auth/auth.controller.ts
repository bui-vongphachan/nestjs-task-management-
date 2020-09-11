import { Body, Post, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentailDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentailDto: AuthCredentailDto) {
    return this.authService.signUp(authCredentailDto);
  }
}
