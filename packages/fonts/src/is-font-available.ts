import type { FontStyle } from "@repo/types";
import { getFont } from "./get-font";

export function isFontAvailable(family: string, style: FontStyle, subset: string): boolean {
	const font = getFont(family);

	return !!font && font.styles.includes(style) && font.subsets.includes(subset);
}
