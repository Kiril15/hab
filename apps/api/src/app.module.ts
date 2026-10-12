import { Module } from '@nestjs/common';
import { TemplatesModule } from './modules/templates/templates.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { GeneratorModule } from './modules/generator/generator.module';
import { commonEnv } from './config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
      load: [commonEnv]
    }),
    TemplatesModule,
    HealthModule,
    GeneratorModule
  ]
})
export class AppModule {}
