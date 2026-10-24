import type { I18nOptions, LocalePrefix } from "@repo/types";
import { ArrayMinSize, ArrayUnique, IsArray, IsIn, Matches } from "class-validator";
import { IsDefaultLocale } from "../../validators";

const LOCALE_TAG = /^[a-z]{2,3}(-[A-Z][a-z]{3})?(-([A-Z]{2}|\d{3}))?$/;
const LOCALE_PREFIXES: LocalePrefix[] = ["always", "as-needed", "never"];

export class I18nOptionsDto implements I18nOptions {
	@IsArray()
	@ArrayMinSize(1)
	@ArrayUnique()
	@Matches(LOCALE_TAG, {
		each: true,
		message: "$property must contain language tags like en or en-US",
	})
	locales: string[];

	@IsDefaultLocale()
	defaultLocale: string;

	@IsIn(LOCALE_PREFIXES)
	localePrefix: LocalePrefix;
}
