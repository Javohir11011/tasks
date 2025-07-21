import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/config/role/role';

@Schema({ timestamps: true })
export class StudentEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.User })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(StudentEntity);
