import type { Fonts } from "@repo/types";
import { getFontSlots } from "./get-font-slots.helper";

// ${fontPrimary.variable} ${fontSecondary.variable}
export function buildFontClassNames(fonts: Fonts): string {
	return getFontSlots(fonts)
		.map(({ constName }) => `\${${constName}.variable}`)
		.join(" ");
}
