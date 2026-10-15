"use server";

import { type FontOption, getFontOption, searchFonts } from "@repo/fonts";

export async function searchFontsAction(query: string): Promise<FontOption[]> {
	return searchFonts(query);
}

export async function getFontOptionAction(family: string): Promise<FontOption | null> {
	return getFontOption(family) ?? null;
}
