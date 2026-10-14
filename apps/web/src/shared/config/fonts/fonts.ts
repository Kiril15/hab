import { Geist, Geist_Mono } from "next/font/google";

export const fontPrimary = Geist({
	variable: "--font-primary",
	subsets: ["latin", "cyrillic"],
	display: "swap",
});

export const fontCode = Geist_Mono({
	variable: "--font-code",
	subsets: ["latin", "cyrillic"],
	display: "swap",
});

export const fontVariables = `${fontPrimary.variable} ${fontCode.variable}`;
