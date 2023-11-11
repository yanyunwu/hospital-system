import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.development.local', '.env'] }), 
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
