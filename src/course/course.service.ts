import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<CourseEntity>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const course = await this.courseModel.findOne({
        name: createCourseDto.title,
      });
      if (course) {
        throw new BadRequestException('Course with this title already exists');
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
      throw new BadRequestException(error.message || 'Failed to get courses');
    }
  }

  async findOne(id: string) {
    try {
      const course = await this.courseModel.findById(id);
      if (!course) throw new NotFoundException('Course not found');
      return course;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to get course');
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    try {
      const course = await this.courseModel.findByIdAndUpdate(
        id,
        updateCourseDto,
        { new: true },
      );
      if (!course) throw new NotFoundException('Course not found');
      return course;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to update course');
    }
  }

  async remove(id: string) {
    try {
      const course = await this.courseModel.findByIdAndDelete(id);
      if (!course) throw new NotFoundException('Course not found');
      return course;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to delete course');
    }
  }
}
