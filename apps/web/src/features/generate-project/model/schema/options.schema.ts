import { z } from "zod";
import { hasUniqueValues } from "@/shared/lib/array";
import { LOCALE_PREFIXES, MAX_LOCALES } from "../../config";
import { LOCALE_TAG } from "./patterns";

const i18nSchema = z
	.object({
		locales: z
			.array(z.string().regex(LOCALE_TAG, "localeTag"))
			.min(1, "localesRequired")
			.max(MAX_LOCALES, "localesMax")
			.refine(hasUniqueValues, "localeDuplicate"),
		defaultLocale: z.string(),
		localePrefix: z.enum(LOCALE_PREFIXES),
	})
	.refine(({ locales, defaultLocale }) => locales.includes(defaultLocale), {
		message: "defaultLocale",
		path: ["defaultLocale"],
	});

export const optionsSchema = z.object({
	i18n: i18nSchema.nullable(),
});
