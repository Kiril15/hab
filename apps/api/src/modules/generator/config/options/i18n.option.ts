import type { OptionConfig } from "../../types";

export const I18N_CONFIG: OptionConfig = {
	id: "i18n",
	dependencies: [{ name: "next-intl", version: "^4.14.0" }],
	providers: [{ name: "NextIntlClientProvider", from: "next-intl" }],
};
