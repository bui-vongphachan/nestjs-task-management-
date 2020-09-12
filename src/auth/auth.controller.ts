import { Body, Post, Controller, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentailDto } from './dto/auth-credentials.dto';

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
}
