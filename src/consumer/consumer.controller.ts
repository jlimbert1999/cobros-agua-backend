import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { CreateActionDto, CreateClientDto } from './dto';

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

  @Get('actions/search/:text')
  searchAvailableActions(@Param('text') text: string) {
    return this.consumerService.searchAvailableActions(text);
  }
}
