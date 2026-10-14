import type { Variants } from "framer-motion";

export const stagger: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};
