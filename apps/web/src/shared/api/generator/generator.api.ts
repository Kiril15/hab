import type { GenerateProjectRequest } from "@repo/types";
import { $api } from "../client";

export async function generateProject(request: GenerateProjectRequest) {
	const { data } = await $api.post<Blob>("/generator/project/generate", request, {
		responseType: "blob",
	});
	return { blob: data, filename: `${request.packageJson.projectName}.zip` };
}
