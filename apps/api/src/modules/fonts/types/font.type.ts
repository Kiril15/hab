import type { FontStyle } from '@repo/types';

export type { FontStyle };

export interface FontLoaderOptions {
    variable: string;
    weight?: string[];
    style: FontStyle[];
    subsets: string[];
}
