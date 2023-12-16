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

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.development.local', '.env'] }),
    AdminModule,
    MpModule,
    EventsModule,
    SessionModule,
    FileModule,
    CommunityModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      // password: '12345678',
      password: '2001',
      database: 'hospital_system',
      entities: [resolve(__dirname, './entities/**/*.entity.{js,ts}')],
      synchronize: true,
      logging: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
