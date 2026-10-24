import { Injectable, Logger } from "@nestjs/common";
import {
	buildFontClassNames,
	buildFontDeclarations,
	buildFontImports,
	buildLayoutStub,
} from "../../../shared/helpers";
import type { GenerateProjectDto } from "../dto";
import { getAppDir, getEnabledOptions } from "../helpers";
import type { ArchiveEntry, ProjectFileBuilder } from "../types";

@Injectable()
export class LayoutBuilder implements ProjectFileBuilder {
	private readonly logger = new Logger(LayoutBuilder.name);

	build({ fonts, projectOptions }: GenerateProjectDto): ArchiveEntry[] {
		const path = `${getAppDir(projectOptions)}/layout.tsx`;
		const content = buildLayoutStub({
			fontCode: {
				imports: buildFontImports(fonts),
				declarations: buildFontDeclarations(fonts),
				classNames: buildFontClassNames(fonts),
			},
			isLocalized: Boolean(projectOptions.i18n),
			providers: getEnabledOptions(projectOptions).flatMap(({ providers }) => providers),
		});

		this.logger.log(`Generating layout at ${path}`);

		return [{ name: path, content }];
	}
}
