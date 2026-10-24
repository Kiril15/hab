import { Injectable, Logger } from "@nestjs/common";
import {
	buildPage,
	buildView,
	buildViewIndex,
	buildViewMetadata,
	DEFAULT_PAGE,
} from "../../../../shared/codegen";
import { capitalizeSlug } from "../../../../shared/utils";
import type { ProjectFile, ProjectFileBuilder } from "../../core/types";
import type { GenerateProjectDto } from "../../dto";
import { getEnabledOptions } from "../../options/helpers";
import { HOME_VIEW } from "../config";
import { getAppDir } from "../helpers";
import type { PageRoute } from "../types";

@Injectable()
export class PagesBuilder implements ProjectFileBuilder {
	private readonly logger = new Logger(PagesBuilder.name);

	build({ pages, projectOptions }: GenerateProjectDto): ProjectFile[] {
		const options = getEnabledOptions(projectOptions);
		const appDir = getAppDir(options);
		const parts = options.find((option) => option.page)?.page ?? DEFAULT_PAGE;
		const routes: PageRoute[] = [
			{ name: HOME_VIEW.name, routeDir: appDir, viewDir: HOME_VIEW.dir },
			...pages.map((page) => ({ name: page, routeDir: `${appDir}/${page}`, viewDir: page })),
		];

		this.logger.log(
			`Generating pages in ${appDir}: ${["/", ...pages.map((page) => `/${page}`)].join(", ")}`,
		);

		return routes.flatMap(({ name, routeDir, viewDir }) => {
			const componentName = `${capitalizeSlug(name)}Page`;
			const viewPath = `src/views/${viewDir}`;

			return [
				{
					path: `${routeDir}/page.tsx`,
					content: buildPage({ componentName, view: viewDir, parts }),
				},
				{ path: `${viewPath}/index.ts`, content: buildViewIndex(componentName, name) },
				{ path: `${viewPath}/${componentName}.tsx`, content: buildView(componentName) },
				{ path: `${viewPath}/${name}.metadata.tsx`, content: buildViewMetadata(name) },
			];
		});
	}
}
