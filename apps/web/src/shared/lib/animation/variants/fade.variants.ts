import type { Variants } from "framer-motion";
import { ANIMATION_DISTANCE, ANIMATION_TRANSITION } from "../animation.config";

export const fade: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: ANIMATION_TRANSITION },
};

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: ANIMATION_DISTANCE },
	visible: { opacity: 1, y: 0, transition: ANIMATION_TRANSITION },
};

export const fadeDown: Variants = {
	hidden: { opacity: 0, y: -ANIMATION_DISTANCE },
	visible: { opacity: 1, y: 0, transition: ANIMATION_TRANSITION },
};

export const fadeLeft: Variants = {
	hidden: { opacity: 0, x: ANIMATION_DISTANCE },
	visible: { opacity: 1, x: 0, transition: ANIMATION_TRANSITION },
};

export const fadeRight: Variants = {
	hidden: { opacity: 0, x: -ANIMATION_DISTANCE },
	visible: { opacity: 1, x: 0, transition: ANIMATION_TRANSITION },
};
