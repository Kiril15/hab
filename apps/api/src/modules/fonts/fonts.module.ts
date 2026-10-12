import { Module } from '@nestjs/common';
import { FontRegistry } from './fonts.registry';
import { IsAvailableFontConstraint } from './validators';

@Module({
  providers: [FontRegistry, IsAvailableFontConstraint],
  exports: [FontRegistry, IsAvailableFontConstraint],
})
export class FontsModule {}
