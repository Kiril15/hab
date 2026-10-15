"use client";

import type { Theme } from "@repo/types";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/shared/lib/animation";
import { ColorField, ThemePreview } from "../fields";

const THEME_COLORS: readonly (keyof Theme)[] = [
	"background",
	"foreground",
	"primary",
	"primaryForeground",
	"secondary",
	"secondaryForeground",
	"muted",
	"mutedForeground",
	"accent",
	"border",
	"destructive",
];

export function ThemeStep() {
	return (
		<div className="grid gap-6 lg:grid-cols-[1fr_280px]">
			<motion.div
				variants={stagger}
				initial="hidden"
				animate="visible"
				className="grid gap-4 sm:grid-cols-2"
			>
				{THEME_COLORS.map((color) => (
					<motion.div
						key={color}
						variants={fadeUp}
					>
						<ColorField name={color} />
					</motion.div>
				))}
			</motion.div>

			<div className="lg:sticky lg:top-6 lg:self-start">
				<ThemePreview />
			</div>
		</div>
	);
}
