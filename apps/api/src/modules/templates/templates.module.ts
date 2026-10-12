import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesRepository } from './templates.repository';

@Module({
  providers: [TemplatesService, TemplatesRepository],
  exports: [TemplatesService],
})
export class TemplatesModule {}
