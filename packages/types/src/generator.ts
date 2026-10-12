import type { Fonts } from "./fonts";
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
	pages: string[];
	theme: Theme;
	fonts: Fonts;
}
