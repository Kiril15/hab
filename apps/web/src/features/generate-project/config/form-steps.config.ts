import { Boxes, FileText, Package, Palette, Type } from "lucide-react";
import type { FieldPath } from "react-hook-form";
import type { GenerateProjectFormValues } from "../model/types";

export type FormStepId = "project" | "pages" | "dependencies" | "theme" | "fonts";

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
] as const satisfies readonly FormStep[];
