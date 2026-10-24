import type { ProjectOptions } from "@repo/types";
import type { TemplateVariable } from "../../templates/types";
import { I18N_PLACEHOLDERS } from "../config";

export function resolveI18nVariables({ i18n }: ProjectOptions): TemplateVariable[] {
	if (!i18n) return [];

	return [
		{ key: I18N_PLACEHOLDERS.locales, value: JSON.stringify(i18n.locales) },
		{ key: I18N_PLACEHOLDERS.defaultLocale, value: i18n.defaultLocale },
		{ key: I18N_PLACEHOLDERS.localePrefix, value: i18n.localePrefix },
	];
}
