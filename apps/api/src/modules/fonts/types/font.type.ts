import type { FontStyle } from '@repo/types';

export type { FontStyle };

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

export interface FontLoaderOptions {
    variable: string;
    weight?: string[];
    style: FontStyle[];
    subsets: string[];
}
