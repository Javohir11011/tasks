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
import { UpdateCourseDto } from './dto/update-course.dto';
import { RolesGuard } from 'src/config/guards/role.guard';
import { Roles } from 'src/config/guards/role.deco';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Role } from 'src/config/role/role';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new course (admin only)' })
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({ status: 201, description: 'Course created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Admin only.' })
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    try { 
      return this.courseService.findAll();
    } catch (error) {}
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
