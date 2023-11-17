import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Action, Client } from './schemas';
import { Model } from 'mongoose';
import { CreateActionDto, CreateClientDto } from './dto';

@Injectable()
export class ConsumerService {
  constructor(
    @InjectModel(Action.name) private actionModel: Model<Action>,
    @InjectModel(Client.name) private clientModel: Model<Client>,
  ) {}
  async createAction(action: CreateActionDto) {
    const createdAction = new this.actionModel(action);
    return await createdAction.save();
  }

  async searchAvailableActions(text: string) {
    const regexp = new RegExp(text);
    return await this.actionModel
      .find({
        isAvailable: true,
        $or: [{ address: regexp }, { code: text }],
      })
      .limit(5);
  }
  async createClient(client: CreateClientDto) {
    const createdAction = new this.clientModel(client);
    return await createdAction.save();
  }
}
