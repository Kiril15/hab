import type { Theme } from "@repo/types";
import { Matches } from "class-validator";

const HEX_COLOR = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const HEX_COLOR_MESSAGE = { message: "$property must be a hex color like #fff or #ffffff" };

export class ThemeDto implements Theme {
	@Matches(HEX_COLOR, HEX_COLOR_MESSAGE)
	background: string;

	@Matches(HEX_COLOR, HEX_COLOR_MESSAGE)
	foreground: string;

	@Matches(HEX_COLOR, HEX_COLOR_MESSAGE)
	primary: string;

	@Matches(HEX_COLOR, HEX_COLOR_MESSAGE)
	primaryForeground: string;

	@Matches(HEX_COLOR, HEX_COLOR_MESSAGE)
	secondary: string;

	@Matches(HEX_COLOR, HEX_COLOR_MESSAGE)
	secondaryForeground: string;

	@Matches(HEX_COLOR, HEX_COLOR_MESSAGE)
	muted: string;

	@Matches(HEX_COLOR, HEX_COLOR_MESSAGE)
	mutedForeground: string;

	@Matches(HEX_COLOR, HEX_COLOR_MESSAGE)
	accent: string;

	@Matches(HEX_COLOR, HEX_COLOR_MESSAGE)
	border: string;

	@Matches(HEX_COLOR, HEX_COLOR_MESSAGE)
	destructive: string;
}
