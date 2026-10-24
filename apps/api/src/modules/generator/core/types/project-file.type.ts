export interface ProjectFile {
	/** Relative to the project root, always with "/" separators */
	path: string;
	content: string | Buffer;
}
