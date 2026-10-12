import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';

@Injectable()
export class HealthService implements OnApplicationBootstrap {
    private readonly logger = new Logger(HealthService.name);
    
    constructor(
        private readonly discovery: DiscoveryService
    ) {}

    onApplicationBootstrap() {
        const controllers = this.discovery.getControllers();

        this.logger.log(`Discovered ${controllers.length} controllers: (\n ${controllers.map((c) => `${c.name}\n`).join(' ')})`);
    }

    async check() {
        const controllers = this.discovery.getControllers();
        const controllerNames = controllers.map((c) => c.name);

        return {
            status: 'ok',
            controllers: controllerNames,
        };
    }
}
