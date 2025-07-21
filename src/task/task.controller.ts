import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input.' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'List of all tasks.' })
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task found.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Task ID' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Task updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
