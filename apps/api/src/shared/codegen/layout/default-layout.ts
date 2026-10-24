import type { LayoutParts } from "../../types";

export const DEFAULT_LAYOUT: LayoutParts = {
	imports: [],
	css: "./globals.css",
	staticParams: "",
	signature: 'function RootLayout({ children }: LayoutProps<"/">)',
	setup: "",
	lang: '"en"',
};
