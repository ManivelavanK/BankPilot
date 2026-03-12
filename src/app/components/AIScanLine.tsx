import { motion } from "framer-motion";

interface AIScanLineProps {
    color?: string;
}

export function AIScanLine({ color = "#3B82F6" }: AIScanLineProps) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
            <motion.div
                animate={{
                    top: ["-10%", "110%"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    background: `linear-gradient(to right, transparent, ${color}80, transparent)`,
                    boxShadow: `0 0 15px ${color}80`
                }}
                className="absolute left-0 right-0 h-[2px] z-10"
            />
            <motion.div
                animate={{
                    opacity: [0, 0.1, 0],
                    top: ["-10%", "110%"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    background: `linear-gradient(to bottom, ${color}33, transparent)`
                }}
                className="absolute left-0 right-0 h-20 z-10"
            />
        </div>
    );
}
