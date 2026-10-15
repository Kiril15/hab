"use client";

import type { PackageSearchResult } from "@repo/types";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Controller, type UseFieldArrayReturn, useFormContext } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { type GenerateProjectFormValues, useErrorMessage } from "../../model";
import { PackageCombobox } from "./PackageCombobox";

export type DependencyField = "dependencies" | "devDependencies";

interface DependencyListProps {
	name: DependencyField;
	fieldArray: UseFieldArrayReturn<GenerateProjectFormValues, DependencyField>;
}

export function DependencyList({ name, fieldArray }: DependencyListProps) {
	const t = useTranslations("GenerateProject.dependencies");
	const errorMessage = useErrorMessage();
	const {
		register,
		control,
		setValue,
		formState: { errors },
	} = useFormContext<GenerateProjectFormValues>();
	const { fields, append, remove } = fieldArray;

	const listErrors = errors[name];
	const listError = errorMessage(listErrors?.root?.message ?? listErrors?.message);

	return (
		<section className="flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-medium">{t(name)}</h3>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => append({ name: "", version: "" }, { shouldFocus: true })}
				>
					<Plus className="size-4" />
					{t("add")}
				</Button>
			</div>

			<motion.ul
				layout
				className="flex flex-col gap-2"
			>
				<AnimatePresence initial={false}>
					{fields.length === 0 && (
						<motion.li
							key="empty"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="rounded-lg border border-dashed border-border py-4 text-center text-sm text-muted-foreground"
						>
							{t("empty")}
						</motion.li>
					)}

					{fields.map((field, index) => {
						const rowErrors = listErrors?.[index];

						return (
							<motion.li
								key={field.id}
								layout
								initial={{ opacity: 0, y: -8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, x: 16 }}
								transition={{ duration: 0.2 }}
								className="flex flex-col gap-1"
							>
								<div className="flex gap-2">
									<div className="min-w-0 flex-1">
										<Controller
											control={control}
											name={`${name}.${index}.name`}
											render={({ field: nameField }) => (
												<PackageCombobox
													id={`${name}-${index}-name`}
													value={nameField.value}
													isInvalid={Boolean(rowErrors?.name)}
													onSelect={(pkg: PackageSearchResult) => {
														nameField.onChange(pkg.name);
														setValue(`${name}.${index}.version`, `^${pkg.version}`, {
															shouldValidate: true,
														});
													}}
												/>
											)}
										/>
									</div>
									<Input
										className="w-32 shrink-0"
										placeholder="^1.0.0"
										aria-label={t("version")}
										aria-invalid={Boolean(rowErrors?.version)}
										{...register(`${name}.${index}.version`)}
									/>
									<Button
										variant="ghost"
										size="icon"
										className="size-10 shrink-0"
										onClick={() => remove(index)}
										aria-label={t("remove")}
									>
										<X className="size-4" />
									</Button>
								</div>
								{(rowErrors?.name || rowErrors?.version) && (
									<p
										role="alert"
										className="text-xs text-destructive"
									>
										{errorMessage(rowErrors.name?.message ?? rowErrors.version?.message)}
									</p>
								)}
							</motion.li>
						);
					})}
				</AnimatePresence>
			</motion.ul>

			{listError && (
				<p
					role="alert"
					className="text-xs text-destructive"
				>
					{listError}
				</p>
			)}
		</section>
	);
}
