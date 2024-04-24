import { Module } from '@nestjs/common';
import { VisualizationService } from './visualization.service';
import { VisualizationController } from './visualization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [VisualizationController],
  providers: [VisualizationService],
})
export class VisualizationModule {}
