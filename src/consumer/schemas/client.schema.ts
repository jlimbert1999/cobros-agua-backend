import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Action } from './action.schema';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client {
  @Prop({
    required: true,
    type: String,
  })
  firstname: string;

  @Prop({
    required: true,
    type: String,
  })
  lastname: number;

  @Prop({
    required: true,
    type: String,
  })
  middlename: string;

  @Prop({
    required: true,
    type: Number,
  })
  dni: number;

  @Prop({
    required: true,
    type: Number,
  })
  phone: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Action.name }] })
  actions: Action[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
