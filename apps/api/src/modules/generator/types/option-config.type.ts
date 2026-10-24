import type { PackageDependency, ProjectOptions } from "@repo/types";
import type { LayoutProvider } from "../../../shared/types";

export interface OptionConfig {
	id: keyof ProjectOptions;
	dependencies: PackageDependency[];
	providers: LayoutProvider[];
}
