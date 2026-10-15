"use client";

import type { Theme } from "@repo/types";
import { useTranslations } from "next-intl";
import { useController } from "react-hook-form";
import { cn } from "@/shared/lib/cn";
import { expandHexColor } from "@/shared/lib/color";
import { inputBase } from "@/shared/ui/input";
import { type GenerateProjectFormValues, useErrorMessage } from "../../model";

interface ColorFieldProps {
	name: keyof Theme;
}

export function ColorField({ name }: ColorFieldProps) {
	const t = useTranslations("GenerateProject.theme.colors");
	const errorMessage = useErrorMessage();
	const { field, fieldState } = useController<GenerateProjectFormValues, `theme.${keyof Theme}`>({
		name: `theme.${name}`,
	});
	const id = `theme-${name}`;

	return (
		<div className="flex flex-col gap-1.5">
			<label
				htmlFor={id}
				className="text-xs font-medium text-muted-foreground"
			>
				{t(name)}
			</label>
			<div className="flex items-center gap-2">
				<span
					className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-border shadow-sm transition-transform hover:scale-105"
					style={{ background: field.value }}
				>
					<input
						type="color"
						value={expandHexColor(field.value)}
						onChange={(event) => field.onChange(event.target.value)}
						aria-label={t(name)}
						className="absolute inset-0 size-full cursor-pointer opacity-0"
					/>
				</span>
				<input
					id={id}
					value={field.value}
					onChange={field.onChange}
					onBlur={field.onBlur}
					aria-invalid={Boolean(fieldState.error)}
					className={cn(inputBase, "h-10 font-mono uppercase")}
				/>
			</div>
			{fieldState.error && (
				<p
					role="alert"
					className="text-xs text-destructive"
				>
					{errorMessage(fieldState.error.message)}
				</p>
			)}
		</div>
	);
}
