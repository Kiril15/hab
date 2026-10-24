import { Injectable, Logger } from "@nestjs/common";
import type { GenerateProjectDto } from "../dto";
import type { ArchiveEntry, ProjectFileBuilder } from "../types";

@Injectable()
export class I18nBuilder implements ProjectFileBuilder {
	private readonly logger = new Logger(I18nBuilder.name);

	async build(dto: GenerateProjectDto): Promise<ArchiveEntry[]> {
		const { i18n } = dto.projectOptions;
		if (!i18n) return [];

		this.logger.log(`Adding i18n: ${i18n.locales.join(", ")}`);

		const messages = i18n.locales.map((locale) => ({
			name: `src/lib/i18n/messages/${locale}.json`,
			content: "{}\n",
		}));

		return [...messages];
	}
}
