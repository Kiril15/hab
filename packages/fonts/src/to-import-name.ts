// next/font/google maps export names back with replace(/_/g, " ")
export function toImportName(family: string): string {
	return family.replaceAll(" ", "_");
}
