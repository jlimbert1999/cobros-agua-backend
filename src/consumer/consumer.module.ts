import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerService } from './consumer.service';
import { ConsumerController } from './consumer.controller';
import { Action, ActionSchema, Client, ClientSchema } from './schemas';

@Module({
  controllers: [ConsumerController],
  providers: [ConsumerService],
  imports: [
    MongooseModule.forFeature([
      { name: Action.name, schema: ActionSchema },
      { name: Client.name, schema: ClientSchema },
    ]),
  ],
})
export class ConsumerModule {}
