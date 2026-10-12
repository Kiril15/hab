import type { GenerateProjectDto } from '../dto';
import type { ArchiveEntry } from '../types';

export interface ProjectFileBuilder {
    build(dto: GenerateProjectDto): Promise<ArchiveEntry[]> | ArchiveEntry[];
}
