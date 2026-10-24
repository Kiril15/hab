import type { PackageDependency, ProjectOptions } from "@repo/types";
import type { LayoutParts, LayoutProvider, PageParts } from "../../../../shared/types";

export interface OptionDefinition {
	id: keyof ProjectOptions;
	dependencies: PackageDependency[];
	providers: LayoutProvider[];
	routeSegment?: string;
	layout?: LayoutParts;
	page?: PageParts;
}
