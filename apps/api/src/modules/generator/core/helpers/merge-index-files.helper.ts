// Works line by line, so index files merged across layers must contain single-line exports
export function mergeIndexFiles(current: string, addition: string): string {
	const lines = [...current.split("\n"), ...addition.split("\n")].filter(
		(line) => line.trim() !== "",
	);

	return `${[...new Set(lines)].join("\n")}\n`;
}
