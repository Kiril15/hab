import { Injectable, Logger } from "@nestjs/common";
import { type Archiver, ZipArchive } from "archiver";
import { I18nBuilder, LayoutBuilder, PagesBuilder, TemplateFilesBuilder } from "./builders";
import type { GenerateProjectDto } from "./dto";
import { PackageJsonTransformer } from "./transformers";
import type { ProjectFileBuilder, ProjectFileTransformer } from "./types";

@Injectable()
export class GeneratorService {
	private readonly logger = new Logger(GeneratorService.name);
	private readonly builders: ProjectFileBuilder[];
	private readonly transformers: ProjectFileTransformer[];

	constructor(
		templateFilesBuilder: TemplateFilesBuilder,
		layoutBuilder: LayoutBuilder,
		i18nBuilder: I18nBuilder,
		pagesBuilder: PagesBuilder,
		packageJsonTransformer: PackageJsonTransformer,
	) {
		this.builders = [templateFilesBuilder, layoutBuilder, i18nBuilder, pagesBuilder];
		this.transformers = [packageJsonTransformer];
	}

	async generateProject(dto: GenerateProjectDto): Promise<Archiver> {
		const startDate = Date.now();
		this.logger.log("Start generate archive");

		const files = await this.buildFiles(dto);
		await this.transformFiles(files, dto);

		const archive = new ZipArchive({ level: 9 });
		for (const [name, content] of files) {
			archive.append(content, { name });
		}

		void archive.finalize();
		this.logger.log(`Generate archive end: ${Date.now() - startDate}ms`);

		return archive;
	}

	private async buildFiles(dto: GenerateProjectDto): Promise<Map<string, string | Buffer>> {
		const entries = (await Promise.all(this.builders.map((builder) => builder.build(dto)))).flat();
		const files = new Map<string, string | Buffer>();

		for (const { name, content } of entries) {
			if (files.has(name)) {
				this.logger.warn(`Duplicate file from builders: ${name}`);
			}
			files.set(name, content);
		}

		return files;
	}

	private async transformFiles(
		files: Map<string, string | Buffer>,
		dto: GenerateProjectDto,
	): Promise<void> {
		for (const transformer of this.transformers) {
			const content = files.get(transformer.path);
			if (content === undefined) {
				throw new Error(`No file to transform at ${transformer.path}`);
			}

			files.set(transformer.path, await transformer.transform(content.toString(), dto));
		}
	}
}
