import { FONTS } from "./fonts.data";
import type { GoogleFontData } from "./fonts.types";

export function getFont(family: string): GoogleFontData | undefined {
	return FONTS.get(family);
}
