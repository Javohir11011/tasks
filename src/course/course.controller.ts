import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { RegisterUserCourseDto } from 'src/auth/dto/register.dto';
import { RolesGuard } from 'src/config/guards/role.guard';
import { Roles } from 'src/config/guards/role.deco';
import { Role } from 'src/config/role/role';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @Get('all')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  findAll() {
    return this.courseService.findAll();
  }

  @Post('register/course')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  registerUser(@Body() dto: RegisterUserCourseDto) {
    return this.courseService.registerUser(dto);
  }

  @Get('user/:id')
  userCourse(@Param('id') id: string) {
    return this.courseService.findUserCourses(id);
  }
}
