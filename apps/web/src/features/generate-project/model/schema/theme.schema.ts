import { z } from "zod";
import { HEX_COLOR } from "./patterns";

const hexColor = z.string().regex(HEX_COLOR, "hex");

export const themeSchema = z.object({
	background: hexColor,
	foreground: hexColor,
	primary: hexColor,
	primaryForeground: hexColor,
	secondary: hexColor,
	secondaryForeground: hexColor,
	muted: hexColor,
	mutedForeground: hexColor,
	accent: hexColor,
	border: hexColor,
	destructive: hexColor,
});
