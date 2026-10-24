import { Injectable, Logger } from "@nestjs/common";
import { type Archiver, ZipArchive } from "archiver";
import type { ProjectFileBuilder, ProjectFiles, ProjectFileTransformer } from "./core/types";
import type { GenerateProjectDto } from "./dto";
import { I18nMessagesBuilder } from "./options";
import { LayoutBuilder, PagesBuilder, TemplateFilesBuilder } from "./project/builders";
import { PackageJsonTransformer } from "./project/transformers";

@Injectable()
export class GeneratorService {
	private readonly logger = new Logger(GeneratorService.name);
	private readonly builders: ProjectFileBuilder[];
	private readonly transformers: ProjectFileTransformer[];

	constructor(
		templateFilesBuilder: TemplateFilesBuilder,
		layoutBuilder: LayoutBuilder,
		pagesBuilder: PagesBuilder,
		i18nMessagesBuilder: I18nMessagesBuilder,
		packageJsonTransformer: PackageJsonTransformer,
	) {
		this.builders = [templateFilesBuilder, layoutBuilder, pagesBuilder, i18nMessagesBuilder];
		this.transformers = [packageJsonTransformer];
	}

	async generateProject(dto: GenerateProjectDto): Promise<Archiver> {
		const startedAt = Date.now();
		this.logger.log(`Generating project "${dto.project.projectName}"`);

		const files = await this.buildFiles(dto);
		await this.transformFiles(files, dto);
		this.logger.log(`Built ${files.size} files in ${Date.now() - startedAt}ms`);

		const archive = new ZipArchive({ level: 9 });
		archive.on("warning", (error) => this.logger.warn(`Archive warning: ${error.message}`));
		archive.on("error", (error) =>
			this.logger.error(`Archive failed: ${error.message}`, error.stack),
		);
		archive.on("end", () =>
			this.logger.log(`Archive sent: ${archive.pointer()} bytes in ${Date.now() - startedAt}ms`),
		);

		for (const [path, content] of files) {
			archive.append(content, { name: path });
		}

		// The archive is finalized while the response streams it, so awaiting here would deadlock
		void archive.finalize();

		return archive;
	}

	private async buildFiles(dto: GenerateProjectDto): Promise<ProjectFiles> {
		const entries = (await Promise.all(this.builders.map((builder) => builder.build(dto)))).flat();
		const files: ProjectFiles = new Map();

		for (const { path, content } of entries) {
			if (files.has(path)) {
				this.logger.warn(`Duplicate file from builders: ${path}`);
			}
			files.set(path, content);
		}

		return files;
	}

	private async transformFiles(files: ProjectFiles, dto: GenerateProjectDto): Promise<void> {
		for (const transformer of this.transformers) {
			const content = files.get(transformer.path);
			if (content === undefined) {
				throw new Error(`No file to transform at ${transformer.path}`);
			}

			files.set(transformer.path, await transformer.transform(content.toString(), dto));
		}
	}
}
