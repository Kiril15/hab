import { Injectable, Logger } from "@nestjs/common";
import {
	buildFontClassNames,
	buildFontDeclarations,
	buildFontImports,
	buildLayout,
	DEFAULT_LAYOUT,
} from "../../../../shared/codegen";
import type { ProjectFile, ProjectFileBuilder } from "../../core/types";
import type { GenerateProjectDto } from "../../dto";
import { getEnabledOptions } from "../../options/helpers";
import { getAppDir } from "../helpers";

@Injectable()
export class LayoutBuilder implements ProjectFileBuilder {
	private readonly logger = new Logger(LayoutBuilder.name);

	build({ fonts, projectOptions }: GenerateProjectDto): ProjectFile[] {
		const options = getEnabledOptions(projectOptions);
		const path = `${getAppDir(options)}/layout.tsx`;
		const content = buildLayout({
			fontCode: {
				imports: buildFontImports(fonts),
				declarations: buildFontDeclarations(fonts),
				classNames: buildFontClassNames(fonts),
			},
			parts: options.find((option) => option.layout)?.layout ?? DEFAULT_LAYOUT,
			providers: options.flatMap(({ providers }) => providers),
		});

		this.logger.log(`Generating layout at ${path}`);

		return [{ path, content }];
	}
}
