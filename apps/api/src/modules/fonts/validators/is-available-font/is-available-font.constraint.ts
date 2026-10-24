import { Injectable } from "@nestjs/common";
import {
	type ValidationArguments,
	ValidatorConstraint,
	type ValidatorConstraintInterface,
} from "class-validator";
import { FontRegistry } from "../../fonts.registry";
import type { FontSelection } from "../../types";

@ValidatorConstraint({ name: "isAvailableFont" })
@Injectable()
export class IsAvailableFontConstraint implements ValidatorConstraintInterface {
	constructor(private readonly fontRegistry: FontRegistry) {}

	validate(family: unknown, { object }: ValidationArguments): boolean {
		const { style, subset } = object as FontSelection;

		return typeof family === "string" && this.fontRegistry.isAvailable(family, style, subset);
	}

	defaultMessage({ value, object }: ValidationArguments): string {
		const { style, subset } = object as FontSelection;

		return `family "${value}" is not available with style "${style}" and subset "${subset}"`;
	}
}
