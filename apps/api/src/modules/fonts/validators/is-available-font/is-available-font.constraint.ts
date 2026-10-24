import { Injectable } from "@nestjs/common";
import type { FontSelection } from "@repo/types";
import {
	type ValidationArguments,
	ValidatorConstraint,
	type ValidatorConstraintInterface,
} from "class-validator";
import { FontsRegistry } from "../../fonts.registry";

type FontVariant = Pick<FontSelection, "style" | "subset">;

@ValidatorConstraint({ name: "isAvailableFont" })
@Injectable()
export class IsAvailableFontConstraint implements ValidatorConstraintInterface {
	constructor(private readonly fontsRegistry: FontsRegistry) {}

	validate(family: unknown, { object }: ValidationArguments): boolean {
		const { style, subset } = object as FontVariant;

		return typeof family === "string" && this.fontsRegistry.isAvailable(family, style, subset);
	}

	defaultMessage({ value, object }: ValidationArguments): string {
		const { style, subset } = object as FontVariant;

		return `family "${value}" is not available with style "${style}" and subset "${subset}"`;
	}
}
