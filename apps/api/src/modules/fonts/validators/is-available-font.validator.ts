import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidatorConstraint,
    type ValidationArguments,
    type ValidationOptions,
    type ValidatorConstraintInterface,
} from 'class-validator';
import { FontRegistry } from '../fonts.registry';
import type { FontStyle } from '../types';

// Поля проверяемого объекта, которые нужны вместе с family
interface FontSelection {
    style: FontStyle;
    subset: string;
}

@ValidatorConstraint({ name: 'isAvailableFont' })
@Injectable()
export class IsAvailableFontConstraint implements ValidatorConstraintInterface {
    constructor(private readonly fontRegistry: FontRegistry) {}

    validate(family: unknown, { object }: ValidationArguments): boolean {
        const { style, subset } = object as FontSelection;

        return typeof family === 'string' && this.fontRegistry.isAvailable(family, style, subset);
    }

    defaultMessage({ value, object }: ValidationArguments): string {
        const { style, subset } = object as FontSelection;

        return `family "${value}" is not available with style "${style}" and subset "${subset}"`;
    }
}

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
