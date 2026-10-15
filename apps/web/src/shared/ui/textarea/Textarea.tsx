import type { ComponentPropsWithRef } from "react";
import { cn } from "@/shared/lib/cn";
import { inputBase } from "../input";

export function Textarea({ className, ...props }: ComponentPropsWithRef<"textarea">) {
	return (
		<textarea
			className={cn(inputBase, "min-h-24 resize-none py-2", className)}
			{...props}
		/>
	);
}
