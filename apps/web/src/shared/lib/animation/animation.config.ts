import type { Transition } from "framer-motion";

export const ANIMATION_DISTANCE = 24;

export const ANIMATION_TRANSITION: Transition = {
	duration: 0.5,
	ease: [0.22, 1, 0.36, 1],
};

export const ANIMATION_VIEWPORT = { once: true, amount: 0.2 } as const;
