import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/entities/user.entity';
import { CustomJwtModule } from 'src/config/jwt/jwt.module';
import { BycrptService } from 'src/config/bycrpt/bycrpt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: UserSchema }]),
    CustomJwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, BycrptService],
  exports: [MongooseModule],
})
export class AuthModule {}
