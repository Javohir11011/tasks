import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { TokenService } from './creatJwt.service';
import { CustomJwtService } from './jwt.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.ACCESS_SECRET,
        signOptions: {
          expiresIn: process.env.ACCESS_TIME,
        },
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.REFRESH_SECRET,
        signOptions: {
          expiresIn: process.env.REFRESH_TIME,
        },
      }),
    }),
  ],
  providers: [
    CustomJwtService,
    TokenService,
    {
      provide: APP_GUARD,
      useClass: CustomJwtService,
    },
  ],
  exports: [CustomJwtService, TokenService],
})
export class CustomJwtModule {}
