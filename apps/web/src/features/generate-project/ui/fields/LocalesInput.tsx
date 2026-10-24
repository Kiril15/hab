"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { type KeyboardEvent, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { toCanonicalLocale } from "@/shared/lib/locale";
import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { LOCALE_SUGGESTIONS, MAX_LOCALES } from "../../config";
import {
	type GenerateProjectFormValues,
	LOCALE_TAG,
	useErrorMessage,
	useLocaleName,
} from "../../model";

export function LocalesInput() {
	const t = useTranslations("GenerateProject.options.i18n.locales");
	const errorMessage = useErrorMessage();
	const localeName = useLocaleName();
	const { getValues, setValue } = useFormContext<GenerateProjectFormValues>();
	const { field, fieldState } = useController<GenerateProjectFormValues, "options.i18n.locales">({
		name: "options.i18n.locales",
	});
	const [draft, setDraft] = useState("");
	const [draftError, setDraftError] = useState<string>();

	const canAdd = field.value.length < MAX_LOCALES;
	const suggestions = LOCALE_SUGGESTIONS.filter((locale) => !field.value.includes(locale));

	const addLocale = (value: string) => {
		if (!value.trim()) return;

		const locale = toCanonicalLocale(value);
		if (!locale || !LOCALE_TAG.test(locale)) return setDraftError("localeTag");
		if (field.value.includes(locale)) return setDraftError("localeDuplicate");
		if (!canAdd) return setDraftError("localesMax");

		field.onChange([...field.value, locale]);
		if (!getValues("options.i18n.defaultLocale")) {
			setValue("options.i18n.defaultLocale", locale);
		}
		setDraft("");
		setDraftError(undefined);
	};

	const removeLocale = (locale: string) => {
		const locales = field.value.filter((item) => item !== locale);

		field.onChange(locales);
		if (getValues("options.i18n.defaultLocale") === locale) {
			setValue("options.i18n.defaultLocale", locales[0] ?? "");
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" || event.key === ",") {
			event.preventDefault();
			addLocale(draft);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<Field
				label={t("label")}
				htmlFor="locales"
				hint={t("hint")}
				error={errorMessage(draftError ?? fieldState.error?.message)}
			>
				<div className="flex gap-2">
					<Input
						id="locales"
						value={draft}
						placeholder={t("placeholder")}
						autoComplete="off"
						aria-invalid={Boolean(draftError ?? fieldState.error)}
						onChange={(event) => {
							setDraft(event.target.value);
							setDraftError(undefined);
						}}
						onKeyDown={handleKeyDown}
						onBlur={field.onBlur}
					/>
					<Button
						variant="outline"
						size="icon"
						className="size-10 shrink-0"
						onClick={() => addLocale(draft)}
						aria-label={t("add")}
					>
						<Plus className="size-4" />
					</Button>
				</div>
			</Field>

			<motion.ul
				layout
				className="flex min-h-9 flex-wrap gap-2"
			>
				<AnimatePresence
					mode="popLayout"
					initial={false}
				>
					{field.value.map((locale) => (
						<motion.li
							key={locale}
							layout
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ type: "spring", stiffness: 400, damping: 25 }}
							className="flex items-center gap-2 rounded-full bg-accent py-1.5 pr-1.5 pl-3 text-sm font-medium"
						>
							{localeName(locale)}
							<span className="font-mono text-xs text-muted-foreground">{locale}</span>
							<button
								type="button"
								onClick={() => removeLocale(locale)}
								aria-label={t("remove", { locale })}
								className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
							>
								<X className="size-3.5" />
							</button>
						</motion.li>
					))}
				</AnimatePresence>
			</motion.ul>

			{canAdd && suggestions.length > 0 && (
				<div className="flex flex-wrap items-center gap-2">
					<span className="text-xs text-muted-foreground">{t("suggestions")}</span>
					{suggestions.map((locale) => (
						<button
							key={locale}
							type="button"
							onClick={() => addLocale(locale)}
							className="flex items-center gap-1 rounded-full border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
						>
							<Plus className="size-3" />
							{localeName(locale)}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
