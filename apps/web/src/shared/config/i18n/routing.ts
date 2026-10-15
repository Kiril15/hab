import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES } from "@/shared/consts";

export const routing = defineRouting({
	locales: LOCALES,
	defaultLocale: DEFAULT_LOCALE,
	localePrefix: "as-needed",
	localeCookie: {
		name: LOCALE_COOKIE,
		maxAge: 60 * 60 * 24 * 30,
		sameSite: "lax",
		path: "/",
	},
});
