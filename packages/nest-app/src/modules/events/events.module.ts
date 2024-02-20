import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { MessageModule } from '../admin/message/message.module';

@Module({
  imports: [MessageModule],
  providers: [EventsGateway, EventsService],
})
export class EventsModule {}
