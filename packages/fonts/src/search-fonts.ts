import { FONTS } from "./fonts.data";
import type { FontOption } from "./fonts.types";
import { toFontOption } from "./to-font-option";

const DEFAULT_LIMIT = 20;

export function searchFonts(query: string, limit = DEFAULT_LIMIT): FontOption[] {
	const search = query.trim().toLowerCase();
	const startsWith: FontOption[] = [];
	const contains: FontOption[] = [];

	for (const [family, font] of FONTS) {
		const name = family.toLowerCase();

		if (name.startsWith(search)) startsWith.push(toFontOption(family, font));
		else if (name.includes(search)) contains.push(toFontOption(family, font));

		if (startsWith.length >= limit) break;
	}

	return [...startsWith, ...contains].slice(0, limit);
}
