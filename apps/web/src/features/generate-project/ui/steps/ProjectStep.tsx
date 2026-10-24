"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { fadeUp, stagger } from "@/shared/lib/animation";
import { Field } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { type GenerateProjectFormValues, useErrorMessage } from "../../model";

export function ProjectStep() {
	const t = useTranslations("GenerateProject.project");
	const errorMessage = useErrorMessage();
	const {
		register,
		formState: { errors },
	} = useFormContext<GenerateProjectFormValues>();
	const fieldErrors = errors.project;

	return (
		<motion.div
			variants={stagger}
			initial="hidden"
			animate="visible"
			className="grid gap-5"
		>
			<motion.div variants={fadeUp}>
				<Field
					label={t("projectName.label")}
					htmlFor="projectName"
					hint={t("projectName.hint")}
					error={errorMessage(fieldErrors?.projectName?.message)}
				>
					<Input
						id="projectName"
						placeholder={t("projectName.placeholder")}
						autoComplete="off"
						aria-invalid={Boolean(fieldErrors?.projectName)}
						{...register("project.projectName")}
					/>
				</Field>
			</motion.div>

			<motion.div variants={fadeUp}>
				<Field
					label={t("projectDesc.label")}
					htmlFor="projectDesc"
					error={errorMessage(fieldErrors?.projectDesc?.message)}
				>
					<Textarea
						id="projectDesc"
						placeholder={t("projectDesc.placeholder")}
						aria-invalid={Boolean(fieldErrors?.projectDesc)}
						{...register("project.projectDesc")}
					/>
				</Field>
			</motion.div>

			<motion.div variants={fadeUp}>
				<Field
					label={t("author.label")}
					htmlFor="author"
					error={errorMessage(fieldErrors?.author?.message)}
				>
					<Input
						id="author"
						placeholder={t("author.placeholder")}
						autoComplete="name"
						aria-invalid={Boolean(fieldErrors?.author)}
						{...register("project.author")}
					/>
				</Field>
			</motion.div>

			<motion.div variants={fadeUp}>
				<Field
					label={t("siteUrl.label")}
					htmlFor="siteUrl"
					hint={t("siteUrl.hint")}
					error={errorMessage(fieldErrors?.siteUrl?.message)}
				>
					<Input
						id="siteUrl"
						inputMode="url"
						placeholder={t("siteUrl.placeholder")}
						autoComplete="url"
						aria-invalid={Boolean(fieldErrors?.siteUrl)}
						{...register("project.siteUrl")}
					/>
				</Field>
			</motion.div>
		</motion.div>
	);
}
