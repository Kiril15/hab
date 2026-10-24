import { registerDecorator, type ValidationOptions } from "class-validator";
import { IsAvailableFontConstraint } from "./is-available-font.constraint";

export function IsAvailableFont(options?: ValidationOptions) {
	return (object: object, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options,
			validator: IsAvailableFontConstraint,
		});
	};
}
