import type { TemplateVariable } from "../../templates/types";
import { DEFAULT_SITE_URL, SITE_PLACEHOLDERS } from "../config";

export function resolveSiteVariables(siteUrl = DEFAULT_SITE_URL): TemplateVariable[] {
	return [{ key: SITE_PLACEHOLDERS.url, value: siteUrl }];
}
