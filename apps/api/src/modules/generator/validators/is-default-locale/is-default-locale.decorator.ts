import { registerDecorator, type ValidationOptions } from "class-validator";
import { IsDefaultLocaleConstraint } from "./is-default-locale.constraint";

export function IsDefaultLocale(options?: ValidationOptions) {
	return (object: object, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options,
			validator: IsDefaultLocaleConstraint,
		});
	};
}
