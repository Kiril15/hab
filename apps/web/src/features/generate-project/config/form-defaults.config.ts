import type { GenerateProjectFormValues } from "../model/types";

export const DEFAULT_FONT = { family: "Geist", style: "normal", subset: "latin" } as const;

export const FORM_DEFAULTS: GenerateProjectFormValues = {
	project: { projectName: "", projectDesc: "", author: "" },
	pages: [],
	dependencies: [],
	devDependencies: [],
	theme: {
		background: "#ffffff",
		foreground: "#0a0a0a",
		primary: "#2563eb",
		primaryForeground: "#ffffff",
		secondary: "#f1f5f9",
		secondaryForeground: "#0f172a",
		muted: "#f4f4f5",
		mutedForeground: "#71717a",
		accent: "#f59e0b",
		border: "#e4e4e7",
		destructive: "#dc2626",
	},
	fonts: { primary: { ...DEFAULT_FONT }, secondary: null },
};
