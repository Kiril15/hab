import type { GenerateProjectDto } from "../dto";
import type { ArchiveEntry } from "./archive-entry.type";

export interface ProjectFileBuilder {
	build(dto: GenerateProjectDto): Promise<ArchiveEntry[]> | ArchiveEntry[];
}
