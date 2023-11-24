import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Action, Client, Reading } from './schemas';
import { CreateActionDto, CreateClientDto, CreateReadingDto } from './dto';

@Injectable()
export class ConsumerService {
  constructor(
    @InjectModel(Action.name) private actionModel: Model<Action>,
    @InjectModel(Client.name) private clientModel: Model<Client>,
    @InjectModel(Reading.name) private readingModel: Model<Reading>,
  ) {}
  async createAction(action: CreateActionDto) {
    const createdAction = new this.actionModel(action);
    return await createdAction.save();
  }

  async searchAvailableActions(text: string) {
    const regexp = new RegExp(text, 'i');
    return await this.actionModel
      .find({
        isAvailable: true,
        $or: [{ address: regexp }, { code: text }],
      })
      .limit(5);
  }
  async createClient(client: CreateClientDto) {
    const clientDB = await this.clientModel.findOne({ dni: client.dni });
    if (clientDB) {
      throw new BadRequestException(`El DNI:${client.dni} ya existe.`);
    }
    for (const id of client.actions) {
      await this.actionModel.updateOne({ _id: id }, { isAvailable: false });
    }
    const newClient = new this.clientModel(client);
    const createdClient = await newClient.save();
    await createdClient.populate('actions');
    return createdClient;
  }
  async createReading(reading: CreateReadingDto): Promise<{ message: string }> {
    const consumptionDate = new Date(reading.consumptionDate);
    const year = consumptionDate.getFullYear();
    const month = consumptionDate.getMonth();
    const lastRecord = await this.readingModel.findOne({
      consumptionDate: {
        $gte: new Date(year, month, 1),
        $lt: new Date(year, month + 1, 1),
      },
    });
    if (lastRecord) {
      await this.readingModel.updateOne({ _id: lastRecord._id }, reading);
      return { message: 'Lectura actualizada.' };
    }
    const createdReading = new this.readingModel(reading);
    await createdReading.save();
    return { message: 'Lectura creada.' };
  }

  async getClients() {
    return await this.clientModel
      .find({})
      .populate('actions')
      .sort({ _id: -1 });
  }

  async getLastConsumptionRecord(id_action: string) {
    return await this.readingModel
      .findOne({ action: id_action })
      .sort({ consumptionDate: -1 });
  }
  async getActionDebts(id_action: string) {
    return await this.readingModel.find({ action: id_action, isPaid:false });
  }
  async payDebts(readingsIds: string[]) {
    await this.readingModel.updateMany(
      { _id: { $in: readingsIds } },
      { isPaid: true },
    );
    return { message: 'Pagos realizados.' };
  }
}
