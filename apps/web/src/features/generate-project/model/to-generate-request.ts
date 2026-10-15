import type { GenerateProjectRequest } from "@repo/types";
import type { GenerateProjectFormValues } from "./types";

export function toGenerateRequest({
	project,
	pages,
	dependencies,
	devDependencies,
	theme,
	fonts,
}: GenerateProjectFormValues): GenerateProjectRequest {
	return {
		packageJson: { ...project, dependencies, devDependencies },
		pages,
		theme,
		fonts: fonts.secondary
			? { primary: fonts.primary, secondary: fonts.secondary }
			: { primary: fonts.primary },
	};
}
