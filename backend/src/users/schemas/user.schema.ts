import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from 'src/common/enums/user-role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  first_name!: string;

  @Prop({ required: true })
  last_name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true, unique: true })
  phone_number!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: UserRole.USER })
  role!: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
