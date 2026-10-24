export type LocalePrefix = "always" | "as-needed" | "never";

export interface I18nOptions {
	locales: string[];
	defaultLocale: string;
	localePrefix: LocalePrefix;
}

export interface ProjectOptions {
	i18n?: I18nOptions;
}
