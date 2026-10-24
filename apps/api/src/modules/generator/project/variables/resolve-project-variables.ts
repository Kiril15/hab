import type { ProjectInfo } from "@repo/types";
import type { TemplateVariable } from "../../../templates/types";
import { PROJECT_PLACEHOLDERS } from "../placeholders";

export function resolveProjectVariables({
	projectName,
	projectDesc,
	author,
}: ProjectInfo): TemplateVariable[] {
	return [
		{ key: PROJECT_PLACEHOLDERS.projectName, value: projectName },
		{ key: PROJECT_PLACEHOLDERS.projectDesc, value: projectDesc },
		{ key: PROJECT_PLACEHOLDERS.author, value: author },
	];
}
