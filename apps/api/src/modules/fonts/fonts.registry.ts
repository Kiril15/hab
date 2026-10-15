import { Injectable } from "@nestjs/common";
import { type GoogleFontData, getFont, isFontAvailable } from "@repo/fonts";
import type { FontLoaderOptions, FontStyle } from "./types";

@Injectable()
export class FontRegistry {
    get(family: string): GoogleFontData | undefined {
        return getFont(family)
    }

    isAvailable(family: string, style: FontStyle, subset: string): boolean {
        return isFontAvailable(family, style, subset)
    }

    // "Open Sans" → "Open_Sans"
    toImportName(family: string): string {
        return family.replaceAll(' ', '_')
    }

    getLoaderOptions(
        font: GoogleFontData,
        style: FontStyle,
        subset: string,
        variable: string,
    ): FontLoaderOptions {
        const isVariable = font.weights.includes('variable')

        return {
            variable,
            ...(isVariable ? {} : { weight: font.weights }),
            style: [style],
            subsets: [subset],
        }
    }
}
