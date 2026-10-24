import type { I18nOptions } from "@repo/types";
import {
	type ValidationArguments,
	ValidatorConstraint,
	type ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "isDefaultLocale" })
export class IsDefaultLocaleConstraint implements ValidatorConstraintInterface {
	validate(defaultLocale: unknown, { object }: ValidationArguments): boolean {
		const { locales } = object as I18nOptions;

		return (
			typeof defaultLocale === "string" && Array.isArray(locales) && locales.includes(defaultLocale)
		);
	}

	defaultMessage({ value }: ValidationArguments): string {
		return `defaultLocale "${value}" must be one of locales`;
	}
}
