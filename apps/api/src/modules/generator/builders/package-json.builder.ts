import { Injectable, Logger } from '@nestjs/common';
import { TemplatesService } from '../../templates/templates.service';
import { mergeDependencies } from '../../../shared/utils';
import type { GenerateProjectDto } from '../dto';
import type { ArchiveEntry } from '../types';
import type { ProjectFileBuilder } from './project-file-builder.interface';

@Injectable()
export class PackageJsonBuilder implements ProjectFileBuilder {
    private readonly logger = new Logger(PackageJsonBuilder.name);

    constructor(private readonly templatesService: TemplatesService) {}

    async build({ packageJson: pkg }: GenerateProjectDto): Promise<ArchiveEntry[]> {
        const { projectName, projectDesc, author, dependencies, devDependencies } = pkg;
        this.logger.log(`Generating package.json for project: ${projectName}, description: ${projectDesc}, author: ${author}`);

        const render = await this.templatesService.renderFile({
            filePath: 'package.json',
            variables: [
                { key: '__PROJECT_NAME__', value: projectName },
                { key: '__PROJECT_DESC__', value: projectDesc },
                { key: '__PROJECT_AUTHOR__', value: author },
            ],
        });
        const json = JSON.parse(render);

        const depsResult = mergeDependencies(json, 'dependencies', dependencies ?? []);
        const devDepsResult = mergeDependencies(json, 'devDependencies', devDependencies ?? []);

        const overwritten = [...depsResult.overwritten, ...devDepsResult.overwritten];
        if (overwritten.length) {
            this.logger.warn(`Overwrote template dependencies: ${overwritten.join(', ')}`);
        }

        return [{ name: 'package.json', content: JSON.stringify(json, null, 2) }];
    }
}
