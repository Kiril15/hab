import { Injectable } from "@nestjs/common";
import fontData from '../../shared/data/google-fonts.json'
import type { FontLoaderOptions, FontStyle, GoogleFontData } from "./types";

@Injectable()
export class FontRegistry {
    private readonly fonts = new Map<string, GoogleFontData>(
        Object.entries(fontData as Record<string, GoogleFontData>)
    )

    get(family: string): GoogleFontData | undefined {
        return this.fonts.get(family)
    }

    isAvailable(family: string, style: FontStyle, subset: string): boolean {
        const font = this.get(family)

        return !!font && font.styles.includes(style) && font.subsets.includes(subset)
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
