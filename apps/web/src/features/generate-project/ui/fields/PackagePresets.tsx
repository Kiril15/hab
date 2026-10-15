"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { fadeUp, stagger } from "@/shared/lib/animation";
import { cn } from "@/shared/lib/cn";
import { PACKAGE_PRESETS, type PackagePreset } from "../../config";
import { type PresetVersions, useAddPreset } from "../../model";

interface PackagePresetsProps {
	installed: ReadonlySet<string>;
	onAdd: (versions: PresetVersions) => void;
}

const isPresetInstalled = (
	{ packages, devPackages = [] }: PackagePreset,
	installed: ReadonlySet<string>,
) => [...packages, ...devPackages].every((name) => installed.has(name));

export function PackagePresets({ installed, onAdd }: PackagePresetsProps) {
	const t = useTranslations("GenerateProject.dependencies.presets");
	const { mutate, isPending, variables } = useAddPreset(onAdd);

	return (
		<section className="flex flex-col gap-3">
			<h3 className="text-sm font-medium">{t("title")}</h3>

			<motion.ul
				variants={stagger}
				initial="hidden"
				animate="visible"
				className="grid gap-3 sm:grid-cols-2"
			>
				{PACKAGE_PRESETS.map((preset) => {
					const { id, icon: Icon, packages, devPackages = [] } = preset;
					const isInstalled = isPresetInstalled(preset, installed);
					const isLoading = isPending && variables?.id === id;

					return (
						<motion.li
							key={id}
							variants={fadeUp}
						>
							<button
								type="button"
								onClick={() => mutate(preset)}
								disabled={isInstalled || isPending}
								aria-busy={isLoading}
								className={cn(
									"flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-[border-color,background-color,box-shadow,translate] duration-200",
									"hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
									"disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:shadow-none",
									isInstalled ? "border-primary/40 bg-accent" : "border-border bg-background",
								)}
							>
								<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
									<Icon className="size-4" />
								</span>

								<span className="flex min-w-0 flex-1 flex-col gap-0.5">
									<span className="text-sm font-medium">{t(`items.${id}`)}</span>
									<span className="truncate text-xs text-muted-foreground">
										{[...packages, ...devPackages].join(", ")}
									</span>
								</span>

								<span className="flex size-5 shrink-0 items-center justify-center">
									<AnimatePresence
										mode="wait"
										initial={false}
									>
										{isLoading && (
											<motion.span
												key="loading"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
											>
												<LoaderCircle className="size-4 animate-spin text-muted-foreground" />
											</motion.span>
										)}
										{isInstalled && !isLoading && (
											<motion.span
												key="added"
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												transition={{ type: "spring", stiffness: 500, damping: 20 }}
												aria-label={t("added")}
											>
												<Check className="size-4 text-primary" />
											</motion.span>
										)}
									</AnimatePresence>
								</span>
							</button>
						</motion.li>
					);
				})}
			</motion.ul>
		</section>
	);
}
