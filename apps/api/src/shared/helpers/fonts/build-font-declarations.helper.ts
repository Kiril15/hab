import { getFont, getLoaderOptions, toImportName } from "@repo/fonts";
import type { Fonts } from "@repo/types";
import { getFontSlots } from "./get-font-slots.helper";

// const fontPrimary = Inter({
//   variable: "--font-primary",
//   subsets: ["latin"],
// });
export function buildFontDeclarations(fonts: Fonts): string {
	const declarations = getFontSlots(fonts).map(({ constName, variable, font }) => {
		const data = getFont(font.family);
		if (!data) throw new Error(`Unknown font: ${font.family}`);

		const options = getLoaderOptions(data, font.style, font.subset, variable);
		const fields = Object.entries(options)
			.map(([key, value]) => `  ${key}: ${JSON.stringify(value).replaceAll(",", ", ")},`)
			.join("\n");

		return `const ${constName} = ${toImportName(font.family)}({\n${fields}\n});`;
	});

	return declarations.join("\n\n");
}
