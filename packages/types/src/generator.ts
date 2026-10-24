import type { Fonts } from "./fonts";
import type { ProjectOptions } from "./options";
import type { Theme } from "./theme";

export interface PackageDependency {
	name: string;
	version: string;
}

export interface ProjectInfo {
	projectName: string;
	projectDesc: string;
	author: string;
	siteUrl?: string;
}

export interface GenerateProjectRequest {
	project: ProjectInfo;
	dependencies: PackageDependency[];
	devDependencies: PackageDependency[];
	pages: string[];
	theme: Theme;
	fonts: Fonts;
	projectOptions: ProjectOptions;
}
