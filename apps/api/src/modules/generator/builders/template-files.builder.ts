import { basename, join } from "node:path/posix";
import { Injectable, Logger } from "@nestjs/common";
import { TEMPLATE_BASE_DIR, TEMPLATE_OPTIONS_DIR } from "../../../shared/consts";
import { TemplatesService } from "../../templates/templates.service";
import type { RenderedFile } from "../../templates/types";
import type { GenerateProjectDto } from "../dto";
import { getEnabledOptions, mergeIndexFiles } from "../helpers";
import type { ArchiveEntry, ProjectFileBuilder } from "../types";
import { resolveTemplateVariables } from "../variables";

@Injectable()
export class TemplateFilesBuilder implements ProjectFileBuilder {
	private readonly logger = new Logger(TemplateFilesBuilder.name);

	constructor(private readonly templatesService: TemplatesService) {}

	async build(dto: GenerateProjectDto): Promise<ArchiveEntry[]> {
		const variables = resolveTemplateVariables(dto);
		const layers = [
			TEMPLATE_BASE_DIR,
			...getEnabledOptions(dto.projectOptions).map(({ id }) => join(TEMPLATE_OPTIONS_DIR, id)),
		];

		const files = new Map<string, string | Buffer>();
		for (const root of layers) {
			for (const file of await this.templatesService.renderDir({ root, variables })) {
				this.addLayerFile(files, file);
			}
		}

		this.logger.log(`Rendered ${files.size} template files from ${layers.length} layers`);
		this.logger.debug(`Template files: ${[...files.keys()].join(", ")}`);

		return [...files].map(([name, content]) => ({ name, content }));
	}

	private addLayerFile(files: Map<string, string | Buffer>, { path, content }: RenderedFile): void {
		const existing = files.get(path);

		if (existing === undefined) {
			files.set(path, content);
		} else if (basename(path) === "index.ts") {
			this.logger.debug(`Merging index file: ${path}`);
			files.set(path, mergeIndexFiles(existing.toString(), content.toString()));
		} else {
			this.logger.debug(`Overriding template file: ${path}`);
			files.set(path, content);
		}
	}
}
