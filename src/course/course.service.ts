import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CourseEntity } from './entities/course.entity';
import { Model } from 'mongoose';
import { BycrptService } from 'src/config/bycrpt/bycrpt.service';
import { TokenService } from 'src/config/jwt/creatJwt.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { RegisterUserCourseDto } from 'src/auth/dto/register.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<CourseEntity>,
    @InjectModel('User') private readonly authModel: Model<UserEntity>,
    private readonly bcryptService: BycrptService,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    try {
      const course = await this.courseModel.findOne({
        title: createCourseDto.title,
      });
      if (course) {
        throw new ConflictException('Course with this title already exists');
      }
      const newCourse = new this.courseModel(createCourseDto);
      return await newCourse.save();
    } catch (error) {
      throw new BadRequestException(error.message || 'Course creation failed');
    }
  }
  async findAll() {
    try {
      return await this.courseModel.find();
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to retrieve courses',
      );
    }
  }

  async registerUser(dto: RegisterUserCourseDto) {
    try {
      const userEmail = await this.authModel.findOne({ email: dto.email });
      if (userEmail) {
        throw new ConflictException('Email already exists');
      }
      const course = await this.courseModel.findById(dto.courseId);
      if (!course) {
        throw new BadRequestException('Course not found');
      }

      const password = await this.bcryptService.encrypt(dto.password);
      const newUser = new this.authModel({
        ...dto,
        password,
        registeredCourses: [dto.courseId],
      });
      const savedUser = await newUser.save();
      const { password: _, ...result } = savedUser.toObject();
      return result;
    } catch (error) {
      throw new BadRequestException(error.message || 'Registration failed');
    }
  }

  async findUserCourses(userId: string) {
    try {
      const user = await this.authModel
        .findById({ _id: userId })
        .populate('registeredCourses', 'title description');

      if (!user) {
        throw new BadRequestException('User not found');
      }

      return user.registeredCourses;
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to retrieve user courses',
      );
    }
  }
}
