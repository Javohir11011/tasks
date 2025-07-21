import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomJwtModule } from './config/jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';
import { BycrptService } from './config/bycrpt/bycrpt.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URL || 'mongodb://localhost:27017/db'),
    AuthModule,
    UserModule,
    TaskModule,
    CustomJwtModule,
  ],
  controllers: [],
  providers: [BycrptService],
})
export class AppModule {}
