"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { type KeyboardEvent, useState } from "react";
import { useController } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { MAX_PAGES } from "../../config";
import { type GenerateProjectFormValues, PAGE_SLUG, useErrorMessage } from "../../model";

const toSlug = (value: string) => value.trim().toLowerCase().replace(/\s+/g, "-");

export function PagesInput() {
	const t = useTranslations("GenerateProject.pages");
	const errorMessage = useErrorMessage();
	const { field, fieldState } = useController<GenerateProjectFormValues, "pages">({
		name: "pages",
	});
	const [draft, setDraft] = useState("");
	const [draftError, setDraftError] = useState<string>();

	const addPage = () => {
		const slug = toSlug(draft);
		if (!slug) return;

		if (!PAGE_SLUG.test(slug)) return setDraftError("pageSlug");
		if (field.value.includes(slug)) return setDraftError("pageDuplicate");
		if (field.value.length >= MAX_PAGES) return setDraftError("pagesMax");

		field.onChange([...field.value, slug]);
		setDraft("");
		setDraftError(undefined);
	};

	const removePage = (page: string) => field.onChange(field.value.filter((item) => item !== page));

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" || event.key === ",") {
			event.preventDefault();
			addPage();
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<Field
				label={t("label")}
				htmlFor="pages"
				hint={t("hint")}
				error={errorMessage(draftError ?? fieldState.error?.message)}
			>
				<div className="flex gap-2">
					<Input
						id="pages"
						value={draft}
						placeholder={t("placeholder")}
						aria-invalid={Boolean(draftError)}
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
						onClick={addPage}
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
				<li className="rounded-full border border-dashed border-border px-3 py-1.5 text-sm text-muted-foreground">
					/
				</li>
				<AnimatePresence
					mode="popLayout"
					initial={false}
				>
					{field.value.map((page) => (
						<motion.li
							key={page}
							layout
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ type: "spring", stiffness: 400, damping: 25 }}
							className="flex items-center gap-1 rounded-full bg-accent py-1.5 pr-1.5 pl-3 text-sm font-medium"
						>
							/{page}
							<button
								type="button"
								onClick={() => removePage(page)}
								aria-label={t("remove", { page })}
								className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
							>
								<X className="size-3.5" />
							</button>
						</motion.li>
					))}
				</AnimatePresence>
			</motion.ul>
		</div>
	);
}
