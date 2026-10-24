import { Boxes, FileText, Package, Palette, Puzzle, Type } from "lucide-react";
import type { FieldPath } from "react-hook-form";
import type { GenerateProjectFormValues } from "../model/types";

export type FormStepId = "project" | "pages" | "dependencies" | "theme" | "fonts" | "options";

export interface FormStep {
	id: FormStepId;
	icon: typeof Package;
	fields: readonly FieldPath<GenerateProjectFormValues>[];
}

export const FORM_STEPS = [
	{ id: "project", icon: Package, fields: ["project"] },
	{ id: "pages", icon: FileText, fields: ["pages"] },
	{ id: "dependencies", icon: Boxes, fields: ["dependencies", "devDependencies"] },
	{ id: "theme", icon: Palette, fields: ["theme"] },
	{ id: "fonts", icon: Type, fields: ["fonts"] },
	{ id: "options", icon: Puzzle, fields: ["options"] },
] as const satisfies readonly FormStep[];
