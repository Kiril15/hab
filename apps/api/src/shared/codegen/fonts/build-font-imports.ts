import { toImportName } from "@repo/fonts";
import type { Fonts } from "@repo/types";
import { getFontSlots } from "./get-font-slots";

// import { Inter, Roboto } from "next/font/google";
export function buildFontImports(fonts: Fonts): string {
	const importNames = new Set(getFontSlots(fonts).map(({ font }) => toImportName(font.family)));

	return `import { ${[...importNames].join(", ")} } from "next/font/google";`;
}
