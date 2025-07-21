import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { TaskStatus } from 'src/config/enum/tasks.enum';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task title', description: 'Task title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Task description', description: 'Task description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    enum: TaskStatus,
    default: TaskStatus.Pending,
    description: 'Task status',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({
    example: '2025-07-21',
    description: 'Due date',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @ApiProperty({
    example: '60f7c2b8b4d1c826d8e2b123',
    description: 'User ID who created the task',
  })
  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
