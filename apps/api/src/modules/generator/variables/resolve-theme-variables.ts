import type { Theme } from "@repo/types";
import type { TemplateVariable } from "../../templates/types";
import { THEME_PLACEHOLDERS } from "../config";

export function resolveThemeVariables(theme: Theme): TemplateVariable[] {
	const fields = Object.keys(THEME_PLACEHOLDERS) as (keyof Theme)[];

	return fields.map((field) => ({ key: THEME_PLACEHOLDERS[field], value: theme[field] }));
}
