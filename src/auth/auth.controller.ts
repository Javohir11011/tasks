import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { Public } from 'src/config/jwt/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterUserDto) {
    return this.authService.registerUser(dto);
  }

  @Public()
  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.loginUser(dto);
  }
}
