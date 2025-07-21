import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(128)
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  password: string;
}
