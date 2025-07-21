import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/config/role/role';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.User })
  role: Role;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }], default: [] })
  registeredCourses: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
