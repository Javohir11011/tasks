import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BycrptService } from 'src/config/bycrpt/bycrpt.service';
import { TokenService } from 'src/config/jwt/creatJwt.service';
import { StudentEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly authModel: Model<StudentEntity>,
    private readonly bcryptService: BycrptService,
    private readonly jwtService: TokenService,
  ) {}
  async registerUser(dto: RegisterUserDto) {
    try {
      const userEmail = await this.authModel.findOne({ email: dto.email });
      if (userEmail) {
        throw new ConflictException('Email already exists');
      }
      const password = await this.bcryptService.encrypt(dto.password);
      const newUser = new this.authModel({ ...dto, password });
      const savedUser = await newUser.save();

      const { password: _, ...result } = savedUser.toObject();

      return result;
    } catch (error) {
      throw new BadRequestException(error.message || 'Registration failed');
    }
  }
  async loginUser(dto: LoginUserDto) {
    const user = await this.authModel
      .findOne({ email: dto.email })
      .select('password');

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const checkPassword = await this.bcryptService.compare(
      dto.password,
      user.password,
    );

    if (!checkPassword) {
      throw new BadRequestException('Password is incorrect');
    }

    const payload = {
      id: user.id,
      role: user.role,
    };

    const accessToken = this.jwtService.createAccessToken(payload);
    const refreshToken = this.jwtService.createRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }
}
