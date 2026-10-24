import { extname, join } from "node:path";
import { Injectable } from "@nestjs/common";
import { TEMPLATE_IGNORED_NAMES, TEXT_FILE_EXTENSIONS } from "../../shared/consts";
import { TemplatesRepository } from "./templates.repository";
import type { RenderDirProps, RenderedFile, RenderFileProps, RenderProps } from "./types";

@Injectable()
export class TemplatesService {
	constructor(private readonly templatesRepository: TemplatesRepository) {}

	async renderFile({ root, filePath, variables }: RenderFileProps): Promise<string> {
		const content = await this.templatesRepository.readFile(join(root, filePath));

		return this.render({ content, variables });
	}

	async renderDir({ root, variables }: RenderDirProps): Promise<RenderedFile[]> {
		const paths = await this.templatesRepository.listFiles(root, TEMPLATE_IGNORED_NAMES);

		return Promise.all(
			paths.map(async (path) => {
				const sourcePath = join(root, path);

				if (!this.isTextFile(path)) {
					return { path, content: await this.templatesRepository.readFileBuffer(sourcePath) };
				}

				const content = await this.templatesRepository.readFile(sourcePath);
				return { path, content: this.render({ content, variables }) };
			}),
		);
	}

	private render({ content, variables }: RenderProps): string {
		return variables.reduce((result, { key, value }) => result.replaceAll(key, value), content);
	}

	private isTextFile(path: string): boolean {
		return TEXT_FILE_EXTENSIONS.has(extname(path));
	}
}
