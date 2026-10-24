import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { GeneratorModule } from './modules/generator/generator.module';
import { commonEnv } from './config/env';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
      load: [commonEnv]
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 25
    }]),
    HealthModule,
    GeneratorModule
  ]
})
export class AppModule {}
