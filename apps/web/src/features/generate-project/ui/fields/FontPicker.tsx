"use client";

import type { FontOption } from "@repo/fonts";
import type { FontStyle } from "@repo/types";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/shared/lib/cn";
import { Combobox } from "@/shared/ui/combobox";
import { Field } from "@/shared/ui/field";
import { type GenerateProjectFormValues, useFontOption } from "../../model";
import { FontCombobox } from "./FontCombobox";

interface FontPickerProps {
	name: "fonts.primary" | "fonts.secondary";
}

const STYLES: readonly FontStyle[] = ["normal", "italic"];

export function FontPicker({ name }: FontPickerProps) {
	const t = useTranslations("GenerateProject.fonts");
	const { setValue, getValues, control } = useFormContext<GenerateProjectFormValues>();
	const family = useWatch({ control, name: `${name}.family` });
	const { data: font } = useFontOption(family ?? "");

	const handleSelect = (option: FontOption) => {
		setValue(`${name}.family`, option.family, { shouldValidate: true, shouldDirty: true });

		if (!option.styles.includes(getValues(`${name}.style`))) setValue(`${name}.style`, "normal");
		if (!option.subsets.includes(getValues(`${name}.subset`))) {
			setValue(
				`${name}.subset`,
				option.subsets.includes("latin") ? "latin" : (option.subsets[0] ?? ""),
			);
		}
	};

	return (
		<div className="grid gap-4 sm:grid-cols-3">
			<Field
				label={t("family")}
				htmlFor={`${name}-family`}
			>
				<FontCombobox
					id={`${name}-family`}
					value={family ?? ""}
					onSelect={handleSelect}
				/>
			</Field>

			<Field label={t("style")}>
				<Controller
					control={control}
					name={`${name}.style`}
					render={({ field }) => (
						<fieldset className="flex rounded-lg border border-border p-1">
							<legend className="sr-only">{t("style")}</legend>
							{STYLES.map((style) => {
								const isActive = field.value === style;
								const isDisabled = !font?.styles.includes(style);

								return (
									<label
										key={style}
										className={cn(
											"relative flex h-7.5 flex-1 cursor-pointer items-center justify-center rounded-md text-sm transition-colors",
											"has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary",
											isActive
												? "text-primary-foreground"
												: "text-muted-foreground hover:text-foreground",
											isDisabled && "cursor-not-allowed opacity-40",
											style === "italic" && "italic",
										)}
									>
										<input
											type="radio"
											className="sr-only"
											name={field.name}
											value={style}
											checked={isActive}
											disabled={isDisabled}
											onChange={() => field.onChange(style)}
										/>
										{isActive && (
											<motion.span
												layoutId={`${name}-style`}
												className="absolute inset-0 rounded-md bg-primary"
												transition={{ type: "spring", stiffness: 400, damping: 30 }}
											/>
										)}
										<span className="relative">{t(`styles.${style}`)}</span>
									</label>
								);
							})}
						</fieldset>
					)}
				/>
			</Field>

			<Field
				label={t("subset")}
				htmlFor={`${name}-subset`}
			>
				<Controller
					control={control}
					name={`${name}.subset`}
					render={({ field }) => (
						<Combobox
							id={`${name}-subset`}
							value={field.value}
							options={(font?.subsets ?? []).map((subset) => ({ value: subset, label: subset }))}
							onSelect={field.onChange}
							placeholder={t("subsetPlaceholder")}
							emptyText={t("noSubsets")}
						/>
					)}
				/>
			</Field>
		</div>
	);
}
