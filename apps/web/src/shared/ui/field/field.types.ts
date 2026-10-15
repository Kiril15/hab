import type { ReactNode } from "react";

export interface FieldProps {
	label: string;
	htmlFor?: string | undefined;
	hint?: string | undefined;
	error?: string | undefined;
	className?: string | undefined;
	children: ReactNode;
}
