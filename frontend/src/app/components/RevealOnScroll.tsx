import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealOnScrollProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export function RevealOnScroll({ children, delay = 0, direction = "up" }: RevealOnScrollProps) {
    const directions = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directions[direction],
                scale: 0.95
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.6,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
        >
            {children}
        </motion.div>
    );
}
