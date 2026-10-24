import type { PackageInfo } from "@repo/types";
import type { TemplateVariable } from "../../templates/types";
import { PROJECT_PLACEHOLDERS } from "../config";

export function resolveProjectVariables({
	projectName,
	projectDesc,
	author,
}: PackageInfo): TemplateVariable[] {
	return [
		{ key: PROJECT_PLACEHOLDERS.projectName, value: projectName },
		{ key: PROJECT_PLACEHOLDERS.projectDesc, value: projectDesc },
		{ key: PROJECT_PLACEHOLDERS.author, value: author },
	];
}
