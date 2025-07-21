import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { TaskStatus } from 'src/config/enum/tasks.enum';

@Schema({ timestamps: true })
export class TaskEntity {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.Pending })
  status: TaskStatus;

  @Prop({ type: Date })
  dueDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(TaskEntity);
