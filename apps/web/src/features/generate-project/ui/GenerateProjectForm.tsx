"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { FormEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { fadeUp } from "@/shared/lib/animation";
import { FORM_DEFAULTS } from "../config";
import {
	type GenerateProjectFormValues,
	generateProjectSchema,
	toGenerateRequest,
	useFormSteps,
	useGenerateProject,
} from "../model";
import { StepNavigation } from "./StepNavigation";
import { StepProgress } from "./StepProgress";
import { stepTransition } from "./step-transition.variants";
import { STEP_COMPONENTS } from "./steps";

export function GenerateProjectForm() {
	const t = useTranslations("GenerateProject");
	const form = useForm<GenerateProjectFormValues>({
		resolver: zodResolver(generateProjectSchema),
		defaultValues: FORM_DEFAULTS,
		mode: "onTouched",
	});
	const steps = useFormSteps(form.trigger);
	const { mutate, isPending } = useGenerateProject();

	const StepComponent = STEP_COMPONENTS[steps.step.id];

	const submit = form.handleSubmit((values) => mutate(toGenerateRequest(values)));

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		if (!steps.isLast) {
			event.preventDefault();
			void steps.next();
			return;
		}
		void submit(event);
	};

	return (
		<FormProvider {...form}>
			<motion.form
				variants={fadeUp}
				initial="hidden"
				animate="visible"
				onSubmit={handleSubmit}
				noValidate
				className="flex flex-col gap-8 rounded-2xl border border-border bg-background p-6 shadow-xl shadow-foreground/5 sm:p-10"
			>
				<StepProgress
					current={steps.index}
					onSelect={steps.goTo}
				/>

				<div className="overflow-x-clip">
					<AnimatePresence
						mode="wait"
						custom={steps.direction}
						initial={false}
					>
						<motion.div
							key={steps.step.id}
							custom={steps.direction}
							variants={stepTransition}
							initial="enter"
							animate="center"
							exit="exit"
							className="flex flex-col gap-6"
						>
							<header className="flex flex-col gap-1">
								<p className="text-xs font-medium tracking-wide text-primary uppercase">
									{t("progress", { current: steps.index + 1, total: steps.total })}
								</p>
								<h2 className="font-heading text-2xl font-semibold tracking-tight">
									{t(`steps.${steps.step.id}.title`)}
								</h2>
								<p className="text-sm text-muted-foreground">
									{t(`steps.${steps.step.id}.description`)}
								</p>
							</header>

							<StepComponent />
						</motion.div>
					</AnimatePresence>
				</div>

				<StepNavigation
					isFirst={steps.isFirst}
					isLast={steps.isLast}
					isSubmitting={isPending}
					onBack={steps.back}
					onNext={() => void steps.next()}
				/>
			</motion.form>
		</FormProvider>
	);
}
