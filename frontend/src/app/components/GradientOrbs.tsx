import { motion } from "framer-motion";

export function GradientOrbs() {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -50, 50, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full"
            />
            <motion.div
                animate={{
                    x: [0, -120, 80, 0],
                    y: [0, 80, -100, 0],
                    scale: [1, 1.3, 0.8, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-500/10 blur-[150px] rounded-full"
            />
            <motion.div
                animate={{
                    x: [0, 150, -100, 0],
                    y: [0, 100, 150, 0],
                    scale: [1, 1.1, 1.2, 1],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/10 blur-[120px] rounded-full"
            />
        </div>
    );
}
