import type { FontOption } from "./fonts.types";
import { getFont } from "./get-font";
import { toFontOption } from "./to-font-option";

export function getFontOption(family: string): FontOption | undefined {
	const font = getFont(family);

	return font && toFontOption(family, font);
}
