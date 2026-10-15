"use client";

import { useTranslations } from "next-intl";
import { useWatch } from "react-hook-form";
import type { GenerateProjectFormValues } from "../../model";

export function ThemePreview() {
	const t = useTranslations("GenerateProject.theme.preview");
	const theme = useWatch<GenerateProjectFormValues, "theme">({ name: "theme" });

	return (
		<div
			className="flex flex-col gap-4 rounded-xl border p-5 shadow-sm transition-colors duration-300"
			style={{ background: theme.background, color: theme.foreground, borderColor: theme.border }}
		>
			<span
				className="w-fit rounded-full px-2.5 py-0.5 text-xs font-medium"
				style={{ background: theme.accent, color: theme.foreground }}
			>
				{t("badge")}
			</span>

			<div className="flex flex-col gap-1">
				<p className="font-semibold">{t("title")}</p>
				<p
					className="text-sm"
					style={{ color: theme.mutedForeground }}
				>
					{t("text")}
				</p>
			</div>

			<div
				className="rounded-lg p-3 text-sm"
				style={{ background: theme.muted, color: theme.mutedForeground }}
			>
				{t("muted")}
			</div>

			<div className="flex flex-wrap gap-2">
				<span
					className="rounded-md px-3 py-1.5 text-sm font-medium"
					style={{ background: theme.primary, color: theme.primaryForeground }}
				>
					{t("primary")}
				</span>
				<span
					className="rounded-md px-3 py-1.5 text-sm font-medium"
					style={{ background: theme.secondary, color: theme.secondaryForeground }}
				>
					{t("secondary")}
				</span>
				<span
					className="rounded-md px-3 py-1.5 text-sm font-medium"
					style={{ color: theme.destructive }}
				>
					{t("destructive")}
				</span>
			</div>
		</div>
	);
}
