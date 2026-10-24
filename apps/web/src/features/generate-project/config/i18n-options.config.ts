import type { I18nOptions, LocalePrefix } from "@repo/types";

export const LOCALE_PREFIXES = [
	"as-needed",
	"always",
	"never",
] as const satisfies readonly LocalePrefix[];

export const DEFAULT_I18N_OPTIONS: I18nOptions = {
	locales: ["en"],
	defaultLocale: "en",
	localePrefix: "as-needed",
};

export const LOCALE_SUGGESTIONS = ["en", "ru", "uk", "de", "fr", "es", "zh", "ja"];
