import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(128)
  @IsString()
  name: string;

  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  password: string;
}
