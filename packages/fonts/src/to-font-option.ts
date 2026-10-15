import type { FontStyle } from "@repo/types";
import type { FontOption, GoogleFontData } from "./fonts.types";

const isFontStyle = (style: string): style is FontStyle => style === "normal" || style === "italic";

export function toFontOption(family: string, font: GoogleFontData): FontOption {
	return { family, styles: font.styles.filter(isFontStyle), subsets: font.subsets };
}
