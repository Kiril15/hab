import { Injectable, Logger } from '@nestjs/common';
import { toPascalCase } from '../../../shared/utils';
import { buildPageStub, buildViewIndex, buildViewMetadata, buildViewStub } from '../../../shared/helpers';
import type { GenerateProjectDto } from '../dto';
import type { ArchiveEntry } from '../types';
import type { ProjectFileBuilder } from './project-file-builder.interface';

@Injectable()
export class PagesBuilder implements ProjectFileBuilder {
    private readonly logger = new Logger(PagesBuilder.name);

    build({ pages }: GenerateProjectDto): ArchiveEntry[] {
        this.logger.log(`Generating pages: ${pages.join(', ')}`);

        return pages.flatMap((page) => {
            const componentName = `${toPascalCase(page)}Page`;

            return [
                { name: `src/app/${page}/page.tsx`, content: buildPageStub(componentName, page) },
                { name: `src/views/${page}/index.ts`, content: buildViewIndex(componentName, page) },
                { name: `src/views/${page}/${componentName}.tsx`, content: buildViewStub(componentName) },
                { name: `src/views/${page}/${page}.metadata.tsx`, content: buildViewMetadata(page) },
            ];
        });
    }
}
