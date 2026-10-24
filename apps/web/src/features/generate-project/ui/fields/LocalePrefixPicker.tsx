"use client";

import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/shared/lib/cn";
import { LOCALE_PREFIXES } from "../../config";
import type { GenerateProjectFormValues } from "../../model";

export function LocalePrefixPicker() {
	const t = useTranslations("GenerateProject.options.i18n.prefix");
	const { register, control } = useFormContext<GenerateProjectFormValues>();
	const selected = useWatch({ control, name: "options.i18n.localePrefix" });

	return (
		<div className="flex flex-col gap-1.5">
			<p
				id="localePrefix"
				className="text-sm font-medium text-foreground"
			>
				{t("label")}
			</p>

			<div
				role="radiogroup"
				aria-labelledby="localePrefix"
				className="grid gap-2 sm:grid-cols-3"
			>
				{LOCALE_PREFIXES.map((prefix) => (
					<label
						key={prefix}
						className={cn(
							"flex cursor-pointer flex-col gap-1 rounded-lg border p-3 transition-colors",
							selected === prefix
								? "border-primary bg-primary/5"
								: "border-border hover:border-foreground/20",
						)}
					>
						<span className="flex items-center gap-2 text-sm font-medium">
							<input
								type="radio"
								value={prefix}
								className="accent-primary"
								{...register("options.i18n.localePrefix")}
							/>
							{t(`${prefix}.label`)}
						</span>
						<span className="font-mono text-xs text-muted-foreground">
							{t(`${prefix}.example`)}
						</span>
					</label>
				))}
			</div>
		</div>
	);
}
