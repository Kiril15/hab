import type { TemplateVariable } from "../../templates/types";
import type { GenerateProjectDto } from "../dto";
import { resolveI18nVariables } from "./resolve-i18n-variables";
import { resolveProjectVariables } from "./resolve-project-variables";
import { resolveSiteVariables } from "./resolve-site-variables";
import { resolveThemeVariables } from "./resolve-theme-variables";

export function resolveTemplateVariables({
	packageJson,
	siteUrl,
	theme,
	projectOptions,
}: GenerateProjectDto): TemplateVariable[] {
	return [
		...resolveProjectVariables(packageJson),
		...resolveSiteVariables(siteUrl),
		...resolveThemeVariables(theme),
		...resolveI18nVariables(projectOptions),
	];
}
