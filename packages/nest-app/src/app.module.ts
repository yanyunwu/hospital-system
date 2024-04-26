import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'node:path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './modules/events/events.module';
import { AdminModule } from './modules/admin/admin.module';
import { MpModule } from './modules/mp/mp.module';
import { SessionModule } from './modules/session/session.module';
import { FileModule } from './modules/file/file.module';
import { CommunityModule } from './modules/community/community.module';
import { BookingModule } from './modules/booking/booking.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { RrModule } from './modules/rr/rr.module';
import { ConfigModule as SystemConfigModule } from './modules/config/config.module';
import { InitModule } from './modules/init/init.module';
import { RecommendModule } from './modules/recommend/recommend.module';
import { VisualizationModule } from './modules/visualization/visualization.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.local', '.env'] }),
    AdminModule,
    MpModule,
    EventsModule,
    SessionModule,
    FileModule,
    CommunityModule,
    BookingModule,
    FeedbackModule,
    RrModule,
    SystemConfigModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [resolve(__dirname, './entities/**/*.entity.{js,ts}')],
      synchronize: false,
      logging: true,
    }),
    InitModule,
    VisualizationModule,
    RecommendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
