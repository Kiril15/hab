import { Injectable } from "@nestjs/common";
import { isFontAvailable } from "@repo/fonts";
import type { FontStyle } from "./types";

@Injectable()
export class FontRegistry {
	isAvailable(family: string, style: FontStyle, subset: string): boolean {
		return isFontAvailable(family, style, subset);
	}
}
