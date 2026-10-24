import type { ProjectOptions } from "@repo/types";
import { OPTIONS } from "../config";
import type { OptionConfig } from "../types";

export function getEnabledOptions(projectOptions: ProjectOptions): OptionConfig[] {
	return OPTIONS.filter(({ id }) => Boolean(projectOptions[id]));
}
