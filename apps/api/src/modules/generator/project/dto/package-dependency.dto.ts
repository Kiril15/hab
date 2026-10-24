import type { PackageDependency } from "@repo/types";
import { IsString, Matches } from "class-validator";

export class PackageDependencyDto implements PackageDependency {
	@IsString()
	@Matches(/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/, {
		message: "Invalid npm package name",
	})
	name: string;

	@IsString()
	@Matches(/^[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/, {
		message: "Invalid semver version",
	})
	version: string;
}
