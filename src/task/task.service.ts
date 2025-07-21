import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskEntity>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = await this.taskModel.findOne({ title: createTaskDto.title });
      if (task) {
        throw new BadRequestException('Task with this title already exists');
      }

      const newTask = new this.taskModel(createTaskDto);
      const savedTask = await newTask.save();
      return savedTask;
    } catch (error) {
      throw new BadRequestException(error.message || 'Task creation failed');
    }
  }

  async findAll() {
    try {
      return await this.taskModel.find().populate('createdBy', 'email');
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to retrieve tasks',
      );
    }
  }

  async findOne(id: string) {
    try {
      const task = await this.taskModel
        .findById(id)
        .populate('createdBy', 'email');
      if (!task) {
        throw new BadRequestException('Task not found');
      }
      return task;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to retrieve task');
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const updatedTask = await this.taskModel.findByIdAndUpdate(
        id,
        updateTaskDto,
        {
          new: true,
        },
      );
      if (!updatedTask) {
        throw new BadRequestException('Task not found or update failed');
      }
      console.log('Updated Task:', updatedTask);

      return updatedTask;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to update task');
    }
  }

  async remove(id: string) {
    try {
      const deletedTask = await this.taskModel.findByIdAndDelete(id);
      if (!deletedTask) {
        throw new BadRequestException('Task not found or delete failed');
      }
      return deletedTask;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to delete task');
    }
  }
}
