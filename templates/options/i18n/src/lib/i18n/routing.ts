import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALE_PREFIX, LOCALES } from "@/consts";

export const routing = defineRouting({
	locales: LOCALES,
	defaultLocale: DEFAULT_LOCALE,
	localePrefix: LOCALE_PREFIX,
	localeCookie: {
		name: LOCALE_COOKIE,
		maxAge: 60 * 60 * 24 * 30,
		sameSite: "lax",
		path: "/",
	},
});
