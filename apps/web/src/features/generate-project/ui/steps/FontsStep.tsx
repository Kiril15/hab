"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import { DEFAULT_FONT } from "../../config";
import type { GenerateProjectFormValues } from "../../model";
import { FontPicker } from "../fields";

export function FontsStep() {
	const t = useTranslations("GenerateProject.fonts");
	const { control, setValue } = useFormContext<GenerateProjectFormValues>();
	const hasSecondary = useWatch({ control, name: "fonts.secondary" }) !== null;

	const toggleSecondary = (enabled: boolean) =>
		setValue("fonts.secondary", enabled ? { ...DEFAULT_FONT } : null, { shouldDirty: true });

	return (
		<div className="grid gap-8">
			<section className="grid gap-3">
				<h3 className="text-sm font-medium">{t("primary")}</h3>
				<FontPicker name="fonts.primary" />
			</section>

			<section className="grid gap-3">
				<label className="flex w-fit cursor-pointer items-center gap-3 text-sm font-medium">
					<input
						type="checkbox"
						checked={hasSecondary}
						onChange={(event) => toggleSecondary(event.target.checked)}
						className="size-4 accent-primary"
					/>
					{t("useSecondary")}
				</label>

				<AnimatePresence initial={false}>
					{hasSecondary && (
						<motion.div
							initial={{ opacity: 0, y: -8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.2 }}
						>
							<div className="grid gap-3 pt-2">
								<h3 className="text-sm font-medium">{t("secondary")}</h3>
								<FontPicker name="fonts.secondary" />
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</section>
		</div>
	);
}
