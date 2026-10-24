"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import { DEFAULT_I18N_OPTIONS } from "../../config";
import type { GenerateProjectFormValues } from "../../model";
import { I18nSettings } from "../fields";

export function OptionsStep() {
	const t = useTranslations("GenerateProject.options.i18n");
	const { control, setValue } = useFormContext<GenerateProjectFormValues>();
	const isI18nEnabled = useWatch({ control, name: "options.i18n" }) !== null;

	const toggleI18n = (enabled: boolean) =>
		setValue(
			"options.i18n",
			enabled ? { ...DEFAULT_I18N_OPTIONS, locales: [...DEFAULT_I18N_OPTIONS.locales] } : null,
			{ shouldDirty: true },
		);

	return (
		<section className="grid gap-4 rounded-xl border border-border p-4 sm:p-5">
			<label className="flex cursor-pointer items-start gap-3">
				<input
					type="checkbox"
					checked={isI18nEnabled}
					onChange={(event) => toggleI18n(event.target.checked)}
					className="mt-0.5 size-4 accent-primary"
				/>
				<span className="grid gap-0.5">
					<span className="text-sm font-medium">{t("title")}</span>
					<span className="text-xs text-muted-foreground">{t("description")}</span>
				</span>
			</label>

			<AnimatePresence initial={false}>
				{isI18nEnabled && (
					<motion.div
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.2 }}
					>
						<I18nSettings />
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
