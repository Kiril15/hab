import { Injectable } from '@nestjs/common';
import { TemplatesRepository } from './templates.repository';
import { join } from 'node:path';
import { RenderFileProps } from './types';
import { TEMPLATE_BASE_DIR } from '../../shared/consts';

@Injectable()
export class TemplatesService {
    constructor(private readonly templatesRepository: TemplatesRepository) {}

    async renderFile({ filePath, variables }: RenderFileProps): Promise<string> {
        const raw = await this.templatesRepository.readFile(join(TEMPLATE_BASE_DIR, filePath));

        const rendered = variables.reduce(
            (content, { key, value }) => content.replaceAll(key, value),
            raw
        );

        return rendered;
    }
}
