import type { LayoutParts } from "../../../../../shared/types";

export const LOCALE_LAYOUT: LayoutParts = {
	imports: [
		'import { notFound } from "next/navigation";',
		'import { hasLocale } from "next-intl";',
		'import { setRequestLocale } from "next-intl/server";',
		'import { routing } from "@/lib/i18n";',
	],
	css: "../globals.css",
	staticParams: `
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
`,
	signature: 'async function RootLayout({ children, params }: LayoutProps<"/[locale]">)',
	setup: `  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

`,
	lang: "{locale}",
};
