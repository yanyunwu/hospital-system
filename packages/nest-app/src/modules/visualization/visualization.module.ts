import { Module } from '@nestjs/common';
import { VisualizationService } from './visualization.service';
import { VisualizationController } from './visualization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CommunityModule } from '../community/community.module';
import { UserModule } from '../mp/user/user.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CommunityModule,
    UserModule,
    CommunityModule,
    SessionModule,
  ],
  controllers: [VisualizationController],
  providers: [VisualizationService],
})
export class VisualizationModule {}
