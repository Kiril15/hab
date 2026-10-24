import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GeneratorController } from './generator.controller';
import { TemplatesModule } from '../templates/templates.module';
import { FontsModule } from '../fonts/fonts.module';
import { I18nBuilder, LayoutBuilder, PagesBuilder, TemplateFilesBuilder } from './builders';
import { PackageJsonTransformer } from './transformers';

@Module({
  imports: [TemplatesModule, FontsModule],
  controllers: [GeneratorController],
  providers: [
    GeneratorService,
    TemplateFilesBuilder,
    LayoutBuilder,
    I18nBuilder,
    PagesBuilder,
    PackageJsonTransformer,
  ],
})
export class GeneratorModule {}
