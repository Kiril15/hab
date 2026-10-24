import type { ProjectOptions } from "@repo/types";
import { OPTION_DEFINITIONS } from "../option-definitions";
import type { OptionDefinition } from "../types";

export function getEnabledOptions(projectOptions: ProjectOptions): OptionDefinition[] {
	return OPTION_DEFINITIONS.filter(({ id }) => Boolean(projectOptions[id]));
}
