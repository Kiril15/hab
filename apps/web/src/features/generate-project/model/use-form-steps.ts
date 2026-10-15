import { useState } from "react";
import type { UseFormTrigger } from "react-hook-form";
import { FORM_STEPS } from "../config";
import type { GenerateProjectFormValues } from "./types";

type Direction = 1 | -1;

export function useFormSteps(trigger: UseFormTrigger<GenerateProjectFormValues>) {
	const [[index, direction], setPosition] = useState<[number, Direction]>([0, 1]);

	const step = FORM_STEPS[index] ?? FORM_STEPS[0];
	const isFirst = index === 0;
	const isLast = index === FORM_STEPS.length - 1;

	const next = async () => {
		const isValid = await trigger([...step.fields], { shouldFocus: true });
		if (isValid && !isLast) setPosition([index + 1, 1]);
	};

	const back = () => {
		if (!isFirst) setPosition([index - 1, -1]);
	};

	const goTo = (target: number) => {
		if (target < index) setPosition([target, -1]);
	};

	return { step, index, total: FORM_STEPS.length, direction, isFirst, isLast, next, back, goTo };
}
