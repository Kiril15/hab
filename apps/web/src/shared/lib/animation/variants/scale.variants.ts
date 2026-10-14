import type { Variants } from "framer-motion";
import { ANIMATION_TRANSITION } from "../animation.config";

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: { opacity: 1, scale: 1, transition: ANIMATION_TRANSITION },
};
