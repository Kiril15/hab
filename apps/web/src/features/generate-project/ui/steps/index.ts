import type { ComponentType } from "react";
import type { FormStepId } from "../../config";
import { DependenciesStep } from "./DependenciesStep";
import { FontsStep } from "./FontsStep";
import { PagesStep } from "./PagesStep";
import { ProjectStep } from "./ProjectStep";
import { ThemeStep } from "./ThemeStep";

export const STEP_COMPONENTS: Record<FormStepId, ComponentType> = {
	project: ProjectStep,
	pages: PagesStep,
	dependencies: DependenciesStep,
	theme: ThemeStep,
	fonts: FontsStep,
};
