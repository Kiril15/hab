import { Injectable, Logger } from "@nestjs/common";
import type { ProjectFile, ProjectFileBuilder } from "../../../core/types";
import type { GenerateProjectDto } from "../../../dto";

@Injectable()
export class I18nMessagesBuilder implements ProjectFileBuilder {
	private readonly logger = new Logger(I18nMessagesBuilder.name);

	build({ projectOptions }: GenerateProjectDto): ProjectFile[] {
		const { i18n } = projectOptions;
		if (!i18n) return [];

		this.logger.log(`Generating messages: ${i18n.locales.join(", ")}`);

		return i18n.locales.map((locale) => ({
			path: `src/lib/i18n/messages/${locale}.json`,
			content: "{}\n",
		}));
	}
}
