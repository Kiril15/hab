import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { ButtonProps } from "./button.types";
import { buttonBase, buttonSize, buttonVariant } from "./button.variants";

export function Button({
	variant = "primary",
	size = "md",
	type = "button",
	isLoading = false,
	disabled,
	className,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled || isLoading}
			aria-busy={isLoading}
			className={cn(buttonBase, buttonVariant[variant], buttonSize[size], className)}
			{...props}
		>
			{isLoading && (
				<LoaderCircle
					className="size-4 animate-spin"
					aria-hidden
				/>
			)}
			{children}
		</button>
	);
}
