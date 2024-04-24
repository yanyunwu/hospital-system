import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VisualizationService } from './visualization.service';

@Controller('/api/visualization')
export class VisualizationController {
  constructor(private visualizationService: VisualizationService) {}

  @Get('/getSexCount')
  getSexCount() {
    return this.visualizationService.getSexCount();
  }
}
