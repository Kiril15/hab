import { BadRequestException } from "@nestjs/common";
import type { PackageDependency } from "@repo/types";
import type { MergeDependenciesResult, PackageJson } from "../types";

const FORBIDDEN_DEPENDENCY_NAMES = new Set(["__proto__", "constructor", "prototype"]);

export function mergeDependencies(
	json: PackageJson,
	field: "dependencies" | "devDependencies",
	packages: PackageDependency[],
): MergeDependenciesResult {
	const overwritten: string[] = [];

	for (const { name, version } of packages) {
		if (FORBIDDEN_DEPENDENCY_NAMES.has(name)) {
			throw new BadRequestException(`Invalid package name: ${name}`);
		}

		json[field] ??= {};
		if (json[field][name]) {
			overwritten.push(name);
		}
		json[field][name] = version;
	}

	return { overwritten };
}
