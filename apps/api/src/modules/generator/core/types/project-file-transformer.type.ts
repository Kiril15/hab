import type { GenerateProjectDto } from "../../dto";

export interface ProjectFileTransformer {
	readonly path: string;
	transform(content: string, dto: GenerateProjectDto): string | Promise<string>;
}
