import type { GenerateProjectDto } from "../../dto";
import type { ProjectFile } from "./project-file.type";

export interface ProjectFileBuilder {
	build(dto: GenerateProjectDto): Promise<ProjectFile[]> | ProjectFile[];
}
