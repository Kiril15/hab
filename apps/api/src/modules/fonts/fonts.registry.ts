import { Injectable } from "@nestjs/common";
import { isFontAvailable } from "@repo/fonts";
import type { FontStyle } from "@repo/types";

@Injectable()
export class FontsRegistry {
	isAvailable(family: string, style: FontStyle, subset: string): boolean {
		return isFontAvailable(family, style, subset);
	}
}
