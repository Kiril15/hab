import { join } from "node:path";
import { basename } from "node:path/posix";
import { Injectable, Logger } from "@nestjs/common";
import { TEMPLATE_BASE_DIR, TEMPLATE_OPTIONS_DIR } from "../../../../shared/consts";
import { TemplatesService } from "../../../templates/templates.service";
import { mergeIndexFiles } from "../../core/helpers";
import type { ProjectFile, ProjectFileBuilder, ProjectFiles } from "../../core/types";
import type { GenerateProjectDto } from "../../dto";
import { getEnabledOptions } from "../../options/helpers";
import { resolveTemplateVariables } from "../variables";

@Injectable()
export class TemplateFilesBuilder implements ProjectFileBuilder {
	private readonly logger = new Logger(TemplateFilesBuilder.name);

	constructor(private readonly templatesService: TemplatesService) {}

	async build(dto: GenerateProjectDto): Promise<ProjectFile[]> {
		const variables = resolveTemplateVariables(dto);
		const layers = [
			{ name: "base", root: TEMPLATE_BASE_DIR },
			...getEnabledOptions(dto.projectOptions).map(({ id }) => ({
				name: id,
				root: join(TEMPLATE_OPTIONS_DIR, id),
			})),
		];

		const files: ProjectFiles = new Map();
		for (const { root } of layers) {
			for (const file of await this.templatesService.renderDir({ root, variables })) {
				this.addLayerFile(files, file);
			}
		}

		this.logger.log(
			`Rendered ${files.size} template files from layers: ${layers.map(({ name }) => name).join(", ")}`,
		);
		this.logger.debug(`Template files: ${[...files.keys()].join(", ")}`);

		return [...files].map(([path, content]) => ({ path, content }));
	}

	private addLayerFile(files: ProjectFiles, { path, content }: ProjectFile): void {
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
