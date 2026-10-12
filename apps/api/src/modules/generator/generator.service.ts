import { Injectable, Logger } from '@nestjs/common';
import { Archiver, ZipArchive } from 'archiver';
import { TEMPLATE_BASE_DIR, TEMPLATE_IGNORE } from '../../shared/consts';
import { GenerateProjectDto } from './dto';
import { LayoutBuilder, PackageJsonBuilder, PagesBuilder, ThemeBuilder, type ProjectFileBuilder } from './builders';

@Injectable()
export class GeneratorService {
    private readonly logger = new Logger(GeneratorService.name);
    private readonly builders: ProjectFileBuilder[];

    constructor(
        packageJsonBuilder: PackageJsonBuilder,
        pagesBuilder: PagesBuilder,
        themeBuilder: ThemeBuilder,
        layoutBuilder: LayoutBuilder,
    ) {
        this.builders = [
            packageJsonBuilder, 
            pagesBuilder, 
            themeBuilder,
            layoutBuilder,
        ];
    }

    async generateProject(dto: GenerateProjectDto): Promise<Archiver> {
        const startDate = Date.now()
        this.logger.log('Start generate archive')

        const entries = (await Promise.all( 
            this.builders.map((builder) => builder.build(dto))
        )).flat();

        const archive = new ZipArchive({ level: 9 })

        this.addTemplateDirectory(archive, TEMPLATE_BASE_DIR);
        for (const { name, content } of entries) {
            archive.append(content, { name });
        }

        void archive.finalize();
        this.logger.log(`Generate archive end: ${Date.now() - startDate}ms`)

        return archive;
    }

    private addTemplateDirectory(archive: Archiver, dir: string, extraIgnore: string[] = []): void {
        archive.glob('**/*', {
            cwd: dir,
            dot: true,
            ignore: [...TEMPLATE_IGNORE, ...extraIgnore],
        });
    }
}
