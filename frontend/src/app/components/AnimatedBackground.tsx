import { motion } from "framer-motion";

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Moving Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -80, 0],
                    y: [0, -40, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full"
            />

            {/* Grid Lines */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"
                style={{ maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%)' }}
            />

            {/* Particles/Dots */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: Math.random() * 0.5,
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                        }}
                        animate={{
                            opacity: [0.1, 0.5, 0.1],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full blur-[1px]"
                    />
                ))}
            </div>
        </div>
    );
}
