import type { Theme } from "@repo/types";

export const THEME_PLACEHOLDERS: Record<keyof Theme, string> = {
	background: "__COLOR_BACKGROUND__",
	foreground: "__COLOR_FOREGROUND__",
	primary: "__COLOR_PRIMARY__",
	primaryForeground: "__COLOR_PRIMARY_FOREGROUND__",
	secondary: "__COLOR_SECONDARY__",
	secondaryForeground: "__COLOR_SECONDARY_FOREGROUND__",
	muted: "__COLOR_MUTED__",
	mutedForeground: "__COLOR_MUTED_FOREGROUND__",
	accent: "__COLOR_ACCENT__",
	border: "__COLOR_BORDER__",
	destructive: "__COLOR_DESTRUCTIVE__",
};
