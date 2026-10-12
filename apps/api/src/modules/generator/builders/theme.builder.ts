import { Injectable, Logger } from '@nestjs/common';
import { TemplatesService } from '../../templates/templates.service';
import type { GenerateProjectDto } from '../dto';
import type { ArchiveEntry } from '../types';
import type { ProjectFileBuilder } from './project-file-builder.interface';

const GLOBALS_CSS_PATH = 'src/app/globals.css';

@Injectable()
export class ThemeBuilder implements ProjectFileBuilder {
    private readonly logger = new Logger(ThemeBuilder.name);

    constructor(private readonly templatesService: TemplatesService) {}

    async build({ theme }: GenerateProjectDto): Promise<ArchiveEntry[]> {
        this.logger.log('Generating themes');

        // primaryForeground → __COLOR_PRIMARY_FOREGROUND__
        const variables = Object.entries(theme).map(([name, value]) => ({
            key: `__COLOR_${name.replace(/[A-Z]/g, (char) => `_${char}`).toUpperCase()}__`,
            value,
        }));

        const content = await this.templatesService.renderFile({
            filePath: GLOBALS_CSS_PATH,
            variables,
        });

        return [{ name: GLOBALS_CSS_PATH, content }];
    }
}
