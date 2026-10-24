import type { TemplateVariable } from "../../../templates/types";
import { DEFAULT_SITE_URL } from "../config";
import { SITE_PLACEHOLDERS } from "../placeholders";

export function resolveSiteVariables(siteUrl = DEFAULT_SITE_URL): TemplateVariable[] {
	return [{ key: SITE_PLACEHOLDERS.url, value: siteUrl }];
}
