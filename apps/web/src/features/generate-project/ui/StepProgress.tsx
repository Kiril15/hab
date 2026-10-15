"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/cn";
import { FORM_STEPS } from "../config";

interface StepProgressProps {
	current: number;
	onSelect: (index: number) => void;
}

export function StepProgress({ current, onSelect }: StepProgressProps) {
	const t = useTranslations("GenerateProject");
	const progress = current / (FORM_STEPS.length - 1);

	return (
		<nav aria-label={t("progress", { current: current + 1, total: FORM_STEPS.length })}>
			<div className="relative">
				<div className="absolute top-5 right-5 left-5 h-0.5 rounded-full bg-border" />
				<motion.div
					className="absolute top-5 right-5 left-5 h-0.5 origin-left rounded-full bg-primary"
					initial={false}
					animate={{ scaleX: progress }}
					transition={{ type: "spring", stiffness: 120, damping: 20 }}
				/>

				<ol className="relative flex justify-between">
					{FORM_STEPS.map(({ id, icon: Icon }, index) => {
						const isDone = index < current;
						const isCurrent = index === current;

						return (
							<li key={id}>
								<button
									type="button"
									onClick={() => onSelect(index)}
									disabled={!isDone}
									aria-current={isCurrent ? "step" : undefined}
									className="flex flex-col items-center gap-2 disabled:cursor-default"
								>
									<motion.span
										initial={false}
										animate={{ scale: isCurrent ? 1.1 : 1 }}
										className={cn(
											"flex size-10 items-center justify-center rounded-full border-2 bg-background transition-colors duration-300",
											isDone && "border-primary bg-primary text-primary-foreground",
											isCurrent &&
												"border-primary text-primary shadow-[0_0_0_4px] shadow-primary/15",
											!isDone && !isCurrent && "border-border text-muted-foreground",
										)}
									>
										{isDone ? <Check className="size-4" /> : <Icon className="size-4" />}
									</motion.span>
									<span
										className={cn(
											"hidden text-xs font-medium transition-colors sm:block",
											isCurrent ? "text-foreground" : "text-muted-foreground",
										)}
									>
										{t(`steps.${id}.title`)}
									</span>
								</button>
							</li>
						);
					})}
				</ol>
			</div>
		</nav>
	);
}
