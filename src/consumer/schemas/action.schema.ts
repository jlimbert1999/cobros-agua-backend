import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Action>;

@Schema()
export class Action {
  @Prop({
    required: true,
  })
  address: string;

  @Prop({
    required: true,
  })
  cost: number;

  @Prop({
    unique: true,
    required: true,
  })
  code: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  isAvailable: boolean;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
