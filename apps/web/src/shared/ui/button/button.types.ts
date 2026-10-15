import type { ComponentPropsWithRef } from "react";
import type { buttonSize, buttonVariant } from "./button.variants";

export type ButtonVariant = keyof typeof buttonVariant;
export type ButtonSize = keyof typeof buttonSize;

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
}
