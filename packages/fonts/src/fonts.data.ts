import fontData from "./data/google-fonts.json";
import type { GoogleFontData } from "./fonts.types";

export const FONTS: ReadonlyMap<string, GoogleFontData> = new Map(
	Object.entries(fontData as Record<string, GoogleFontData>),
);
