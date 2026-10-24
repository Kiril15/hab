import type { GenerateProjectRequest } from "@repo/types";
import { $api } from "../client";

export async function generateProject(request: GenerateProjectRequest) {
	const { data } = await $api.post<Blob>("/generator/projects", request, {
		responseType: "blob",
	});
	return { blob: data, filename: `${request.project.projectName}.zip` };
}
