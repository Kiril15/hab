import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { TemplatesService } from '../../templates/templates.service';
import { FontRegistry } from '../../fonts/fonts.registry';
import { buildFontDeclaration } from '../../../shared/helpers';
import type { GenerateProjectDto } from '../dto';
import type { ArchiveEntry } from '../types';
import type { ProjectFileBuilder } from './project-file-builder.interface';

const LAYOUT_PATH = 'src/app/layout.tsx';

@Injectable()
export class LayoutBuilder implements ProjectFileBuilder {
    private readonly logger = new Logger(LayoutBuilder.name);

    constructor(
        private readonly templatesService: TemplatesService,
        private readonly fontRegistry: FontRegistry,
    ) {}

    async build({ fonts }: GenerateProjectDto): Promise<ArchiveEntry[]> {
        const slots = [
            { constName: 'fontPrimary', variable: '--font-primary', font: fonts.primary },
            ...(fonts.secondary
                ? [{ constName: 'fontSecondary', variable: '--font-secondary', font: fonts.secondary }]
                : []),
        ];

        this.logger.log(`Generating layout with fonts: ${slots.map(({ font }) => `${font.family} (${font.style})`).join(', ')}`);

        const importNames = new Set<string>();
        const declarations = slots.map(({ constName, variable, font }) => {
            const data = this.fontRegistry.get(font.family);
            if (!data) {
                throw new BadRequestException(`Unknown font: ${font.family}`);
            }

            const importName = this.fontRegistry.toImportName(font.family);
            importNames.add(importName);

            const options = this.fontRegistry.getLoaderOptions(data, font.style, font.subset, variable);
            return buildFontDeclaration(constName, importName, options);
        });

        const content = await this.templatesService.renderFile({
            filePath: LAYOUT_PATH,
            variables: [
                { key: '"__FONT_IMPORTS__"', value: `import { ${[...importNames].join(', ')} } from "next/font/google";` },
                { key: '"__FONT_DECLARATIONS__"', value: declarations.join('\n\n') },
                { key: '__FONT_VARIABLES__', value: slots.map(({ constName }) => `\${${constName}.variable}`).join(' ') },
            ],
        });

        return [{ name: LAYOUT_PATH, content }];
    }
}
