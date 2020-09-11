import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentailDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
