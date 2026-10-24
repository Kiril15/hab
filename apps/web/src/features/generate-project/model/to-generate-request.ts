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
	const { siteUrl, ...packageInfo } = project;

	return {
		packageJson: { ...packageInfo, dependencies, devDependencies },
		...(siteUrl ? { siteUrl } : {}),
		pages,
		theme,
		projectOptions: options.i18n ? { i18n: options.i18n } : {},
		fonts: fonts.secondary
			? { primary: fonts.primary, secondary: fonts.secondary }
			: { primary: fonts.primary },
	};
}
