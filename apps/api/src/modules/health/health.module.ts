import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [DiscoveryModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
