import type { Variants } from "framer-motion";

export function useAnimatedHover() {
    const slideUpVariants: Variants = {
        initial: { y: 0 },
        hover: { y: "100%" },
    };

    const slideDownVariants: Variants = {
        initial: { y: "-100%" },
        hover: { y: 0 },
    };

    const transitionConfig = {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as const,
    };

    return {
        slideUpVariants,
        slideDownVariants,
        transitionConfig,
    };
}
