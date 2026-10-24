import type { PageParts } from "../../../../../shared/types";

export const LOCALE_PAGE: PageParts = {
	imports: ['import { setRequestLocale } from "next-intl/server";'],
	signature: "async function Page({ params }: { params: Promise<{ locale: string }> })",
	setup: `  const { locale } = await params;
  setRequestLocale(locale);

`,
};
