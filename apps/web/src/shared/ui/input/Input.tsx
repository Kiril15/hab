import type { ComponentPropsWithRef } from "react";
import { cn } from "@/shared/lib/cn";
import { inputBase } from "./input.styles";

export function Input({ className, ...props }: ComponentPropsWithRef<"input">) {
	return (
		<input
			className={cn(inputBase, "h-10", className)}
			{...props}
		/>
	);
}
