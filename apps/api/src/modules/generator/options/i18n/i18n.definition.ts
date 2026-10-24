import type { OptionDefinition } from "../types";
import { LOCALE_LAYOUT, LOCALE_PAGE } from "./codegen";

export const I18N_DEFINITION: OptionDefinition = {
	id: "i18n",
	dependencies: [{ name: "next-intl", version: "^4.14.0" }],
	providers: [{ name: "NextIntlClientProvider", from: "next-intl" }],
	routeSegment: "[locale]",
	layout: LOCALE_LAYOUT,
	page: LOCALE_PAGE,
};
