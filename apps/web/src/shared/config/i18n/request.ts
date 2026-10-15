import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { LOCALE_COOKIE } from "@/shared/consts";
import { routing } from "./routing";

export default getRequestConfig(async () => {
	const store = await cookies();
	const locale = store.get(LOCALE_COOKIE)?.value ?? routing.defaultLocale;

	return {
		locale,
		messages: (await import(`./messages/${locale}.json`)).default,
	};
});
