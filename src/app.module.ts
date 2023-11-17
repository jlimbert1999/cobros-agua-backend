import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumerModule } from './consumer/consumer.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConsumerModule,
    MongooseModule.forRoot('mongodb://localhost/cobros-agua'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
