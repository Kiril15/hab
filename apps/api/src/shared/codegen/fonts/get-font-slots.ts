import type { Fonts } from "@repo/types";
import type { FontSlot } from "../../types";

export function getFontSlots({ primary, secondary }: Fonts): FontSlot[] {
	const slots: FontSlot[] = [
		{ constName: "fontPrimary", variable: "--font-primary", font: primary },
	];

	if (secondary) {
		slots.push({ constName: "fontSecondary", variable: "--font-secondary", font: secondary });
	}

	return slots;
}
