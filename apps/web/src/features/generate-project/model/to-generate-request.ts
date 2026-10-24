import type { GenerateProjectRequest } from "@repo/types";
import type { GenerateProjectFormValues } from "./types";

export function toGenerateRequest({
	project,
	pages,
	dependencies,
	devDependencies,
	theme,
	fonts,
	options,
}: GenerateProjectFormValues): GenerateProjectRequest {
	const { siteUrl, ...info } = project;

	return {
		project: { ...info, ...(siteUrl ? { siteUrl } : {}) },
		dependencies,
		devDependencies,
		pages,
		theme,
		fonts: fonts.secondary
			? { primary: fonts.primary, secondary: fonts.secondary }
			: { primary: fonts.primary },
		projectOptions: options.i18n ? { i18n: options.i18n } : {},
	};
}
