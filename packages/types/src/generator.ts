import type { Fonts } from "./fonts";
import type { ProjectOptions } from "./options";
import type { Theme } from "./theme";

export interface PackageDependency {
	name: string;
	version: string;
}

export interface PackageInfo {
	projectName: string;
	projectDesc: string;
	author: string;
	dependencies?: PackageDependency[];
	devDependencies?: PackageDependency[];
}

export interface GenerateProjectRequest {
	packageJson: PackageInfo;
	siteUrl?: string;
	pages: string[];
	theme: Theme;
	fonts: Fonts;
	projectOptions: ProjectOptions;
}
