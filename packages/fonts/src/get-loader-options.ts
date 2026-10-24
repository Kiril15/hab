import type { FontStyle } from "@repo/types";
import type { FontLoaderOptions, GoogleFontData } from "./fonts.types";

export function getLoaderOptions(
	font: GoogleFontData,
	style: FontStyle,
	subset: string,
	variable: string,
): FontLoaderOptions {
	const isVariable = font.weights.includes("variable");

	return {
		variable,
		...(isVariable ? {} : { weight: font.weights }),
		style: [style],
		subsets: [subset],
	};
}
