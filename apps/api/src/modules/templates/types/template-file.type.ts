export interface RenderedFile {
	/** Relative to the template root, always with "/" separators */
	path: string;
	content: string | Buffer;
}
