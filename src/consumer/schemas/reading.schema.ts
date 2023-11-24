import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Action } from './action.schema';

export type ReadingDocument = HydratedDocument<Reading>;

@Schema({ timestamps: true })
export class Reading {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Action.name,
    required: true,
  })
  action: Action;

  @Prop({
    required: true,
    type: Number,
  })
  consume: number;

  @Prop({
    type: Date,
    required: true,
  })
  consumptionDate: Date;

  @Prop({
    type: Boolean,
    default: false,
  })
  isPaid: boolean;

  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
}

export const ReadingSchema = SchemaFactory.createForClass(Reading);
