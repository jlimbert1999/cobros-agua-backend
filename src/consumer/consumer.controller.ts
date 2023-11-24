import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import {
  CreateActionDto,
  CreateClientDto,
  CreateReadingDto,
  UpdateReadingDto,
} from './dto';

@Controller('consumer')
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Post('action')
  createAction(@Body() action: CreateActionDto) {
    return this.consumerService.createAction(action);
  }

  @Post('client')
  createClient(@Body() client: CreateClientDto) {
    return this.consumerService.createClient(client);
  }
  @Post('reading')
  createReading(@Body() reading: CreateReadingDto) {
    return this.consumerService.createReading(reading);
  }

  @Get('actions/search/:text')
  searchAvailableActions(@Param('text') text: string) {
    return this.consumerService.searchAvailableActions(text);
  }

  @Get('clients')
  getClients() {
    return this.consumerService.getClients();
  }

  @Get('record/last/:id_action')
  getLastConsumptionRecord(@Param('id_action') id_action: string) {
    return this.consumerService.getLastConsumptionRecord(id_action);
  }

  @Get('debts/:id_action')
  getActionDebts(@Param('id_action') id_action: string) {
    return this.consumerService.getActionDebts(id_action);
  }

  @Put('pay/debts')
  payDebts(@Body() body: UpdateReadingDto) {
    return this.consumerService.payDebts(body.readingsIds);
  }
}
