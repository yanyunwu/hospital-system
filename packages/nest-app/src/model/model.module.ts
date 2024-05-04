import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { ConfigModule } from 'src/modules/config/config.module';
import { SessionModule } from 'src/modules/admin/session/session.module';

@Module({
  imports: [ConfigModule, SessionModule],
  controllers: [ModelController],
  providers: [ModelService],
  exports: [ModelService],
})
export class ModelModule {}
