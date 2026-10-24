"use client";

import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import { Field } from "@/shared/ui/field";
import { Select } from "@/shared/ui/select";
import { type GenerateProjectFormValues, useErrorMessage, useLocaleName } from "../../model";
import { LocalePrefixPicker } from "./LocalePrefixPicker";
import { LocalesInput } from "./LocalesInput";

export function I18nSettings() {
	const t = useTranslations("GenerateProject.options.i18n");
	const errorMessage = useErrorMessage();
	const localeName = useLocaleName();
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<GenerateProjectFormValues>();
	const locales = useWatch({ control, name: "options.i18n.locales" }) ?? [];

	return (
		<div className="grid gap-6">
			<LocalesInput />

			<Field
				label={t("defaultLocale.label")}
				htmlFor="defaultLocale"
				hint={t("defaultLocale.hint")}
				error={errorMessage(errors.options?.i18n?.defaultLocale?.message)}
			>
				<Select
					id="defaultLocale"
					disabled={locales.length === 0}
					{...register("options.i18n.defaultLocale")}
				>
					{locales.map((locale) => (
						<option
							key={locale}
							value={locale}
						>
							{localeName(locale)} ({locale})
						</option>
					))}
				</Select>
			</Field>

			<LocalePrefixPicker />
		</div>
	);
}
