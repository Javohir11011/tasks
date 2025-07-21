import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'NodeJS Bootcamp', description: 'Course title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Learn NodeJS from scratch', description: 'Course description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '2025-08-01', description: 'Course start date' })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty({ example: '2025-09-01', description: 'Course end date' })
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}
