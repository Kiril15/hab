import { Injectable, Logger } from "@nestjs/common";
import type { PackageJson } from "../../../../shared/types";
import { mergeDependencies } from "../../../../shared/utils";
import type { ProjectFileTransformer } from "../../core/types";
import type { GenerateProjectDto } from "../../dto";
import { getEnabledOptions } from "../../options/helpers";

@Injectable()
export class PackageJsonTransformer implements ProjectFileTransformer {
	private readonly logger = new Logger(PackageJsonTransformer.name);

	readonly path = "package.json";

	transform(
		content: string,
		{ dependencies, devDependencies, projectOptions }: GenerateProjectDto,
	): string {
		const json = JSON.parse(content) as PackageJson;

		const depsResult = mergeDependencies(json, "dependencies", dependencies);
		const devDepsResult = mergeDependencies(json, "devDependencies", devDependencies);

		const overwritten = [...depsResult.overwritten, ...devDepsResult.overwritten];
		if (overwritten.length) {
			this.logger.warn(`Overwrote template dependencies: ${overwritten.join(", ")}`);
		}

		// Option dependencies are merged last so their versions win over user-picked ones
		const optionDependencies = getEnabledOptions(projectOptions).flatMap(
			(option) => option.dependencies,
		);
		const optionResult = mergeDependencies(json, "dependencies", optionDependencies);
		if (optionResult.overwritten.length) {
			this.logger.warn(
				`Replaced user dependencies with option versions: ${optionResult.overwritten.join(", ")}`,
			);
		}

		return JSON.stringify(json, null, 2);
	}
}
