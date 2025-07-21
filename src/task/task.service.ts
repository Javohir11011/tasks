import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<CreateTaskDto>,
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

  findAll() {
    try {
      return this.taskModel.find().populate('createdBy', 'email');
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to retrieve tasks',
      );
    }
  }

  findOne(id: string) {
    try {
      const task = this.taskModel.findById(id).populate('createdBy', 'email');
      if (!task) {
        throw new BadRequestException('Task not found');
      }
      return task;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to retrieve task');
    }
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const updatedTask = this.taskModel.updateMany(
        { _id: id },
        { $set: updateTaskDto },
      );
      if (!updatedTask) {
        throw new BadRequestException('Task not found or update failed');
      }
      return updatedTask;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to update task');
    }
  }

  remove(id: string) {
    try {
      const deletedTask = this.taskModel.findByIdAndDelete(id);
      if (!deletedTask) {
        throw new BadRequestException('Task not found or delete failed');
      }
      return deletedTask;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to delete task');
    }
  }
}
