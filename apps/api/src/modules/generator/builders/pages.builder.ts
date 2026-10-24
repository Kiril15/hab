import { Injectable, Logger } from "@nestjs/common";
import {
	buildLocalePageStub,
	buildPageStub,
	buildViewIndex,
	buildViewMetadata,
	buildViewStub,
} from "../../../shared/helpers";
import { toPascalCase } from "../../../shared/utils";
import { HOME_VIEW } from "../config";
import type { GenerateProjectDto } from "../dto";
import { getAppDir } from "../helpers";
import type { ArchiveEntry, PageRoute, ProjectFileBuilder } from "../types";

@Injectable()
export class PagesBuilder implements ProjectFileBuilder {
	private readonly logger = new Logger(PagesBuilder.name);

	build({ pages, projectOptions }: GenerateProjectDto): ArchiveEntry[] {
		const appDir = getAppDir(projectOptions);
		const buildPage = projectOptions.i18n ? buildLocalePageStub : buildPageStub;
		const routes: PageRoute[] = [
			{ name: HOME_VIEW.name, routeDir: appDir, viewDir: HOME_VIEW.dir },
			...pages.map((page) => ({ name: page, routeDir: `${appDir}/${page}`, viewDir: page })),
		];

		this.logger.log(
			`Generating pages in ${appDir}: /, ${pages.map((page) => `/${page}`).join(", ")}`,
		);

		return routes.flatMap(({ name, routeDir, viewDir }) => {
			const componentName = `${toPascalCase(name)}Page`;
			const viewPath = `src/views/${viewDir}`;

			return [
				{ name: `${routeDir}/page.tsx`, content: buildPage(componentName, viewDir) },
				{ name: `${viewPath}/index.ts`, content: buildViewIndex(componentName, name) },
				{ name: `${viewPath}/${componentName}.tsx`, content: buildViewStub(componentName) },
				{ name: `${viewPath}/${name}.metadata.tsx`, content: buildViewMetadata(name) },
			];
		});
	}
}
