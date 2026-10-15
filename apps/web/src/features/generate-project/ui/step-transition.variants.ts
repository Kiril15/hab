import type { Variants } from "framer-motion";

const OFFSET = 40;

export const stepTransition: Variants = {
	enter: (direction: number) => ({ opacity: 0, x: direction * OFFSET }),
	center: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
	exit: (direction: number) => ({
		opacity: 0,
		x: direction * -OFFSET,
		transition: { duration: 0.2 },
	}),
};
