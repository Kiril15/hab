import type { FontStyle } from "@repo/types";

export interface FontAxis {
	tag: string;
	min: number;
	max: number;
	defaultValue: number;
}

export interface GoogleFontData {
	weights: string[];
	styles: string[];
	subsets: string[];
	axes?: FontAxis[];
}

export interface FontOption {
	family: string;
	styles: FontStyle[];
	subsets: string[];
}

export interface FontLoaderOptions {
	variable: string;
	weight?: string[];
	style: FontStyle[];
	subsets: string[];
}
