import { Database, ListTodo, type LucideIcon, Shapes, Sparkles } from "lucide-react";

export type PackagePresetId = "forms" | "animation" | "icons" | "data";

export interface PackagePreset {
	id: PackagePresetId;
	icon: LucideIcon;
	packages: string[];
	devPackages?: string[];
}

export const PACKAGE_PRESETS: readonly PackagePreset[] = [
	{ id: "forms", icon: ListTodo, packages: ["zod", "react-hook-form", "@hookform/resolvers"] },
	{ id: "animation", icon: Sparkles, packages: ["framer-motion"] },
	{ id: "icons", icon: Shapes, packages: ["lucide-react"] },
	{ id: "data", icon: Database, packages: ["@tanstack/react-query", "axios"] },
];
