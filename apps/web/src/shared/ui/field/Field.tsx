"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import type { FieldProps } from "./field.types";

export function Field({ label, htmlFor, hint, error, className, children }: FieldProps) {
	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			<label
				htmlFor={htmlFor}
				className="text-sm font-medium text-foreground"
			>
				{label}
			</label>

			{children}

			<AnimatePresence
				initial={false}
				mode="wait"
			>
				{error ? (
					<motion.p
						key="error"
						role="alert"
						className="text-xs text-destructive"
						initial={{ opacity: 0, y: -4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.15 }}
					>
						{error}
					</motion.p>
				) : (
					hint && (
						<motion.p
							key="hint"
							className="text-xs text-muted-foreground"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15 }}
						>
							{hint}
						</motion.p>
					)
				)}
			</AnimatePresence>
		</div>
	);
}
