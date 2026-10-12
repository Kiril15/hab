import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { Throttle } from '@nestjs/throttler';

@Controller('health')
export class HealthController {
    constructor(
        private readonly healthService: HealthService
    ) {}

    @Throttle({ default: { limit: 10, ttl: 60 * 60 } })
    @Get('check')
    async check() {
        return this.healthService.check();
    }
}
