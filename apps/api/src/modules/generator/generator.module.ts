import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GeneratorController } from './generator.controller';
import { TemplatesModule } from '../templates/templates.module';
import { FontsModule } from '../fonts/fonts.module';
import { LayoutBuilder, PackageJsonBuilder, PagesBuilder, ThemeBuilder } from './builders';

@Module({
  imports: [TemplatesModule, FontsModule],
  controllers: [GeneratorController],
  providers: [GeneratorService, PackageJsonBuilder, PagesBuilder, ThemeBuilder, LayoutBuilder],
})
export class GeneratorModule {}
