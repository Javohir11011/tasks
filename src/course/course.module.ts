import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './entities/course.entity';
import { UserSchema } from '../user/entities/user.entity';
import { BycrptService } from '../config/bycrpt/bycrpt.service';
import { TokenService } from '../config/jwt/creatJwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService, BycrptService],
  exports: [CourseService],
})
export class CourseModule {}
