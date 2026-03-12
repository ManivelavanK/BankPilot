import { motion } from "framer-motion";

export function LandingHeroBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-[#020617]">
            {/* Ambient Glows */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 -left-[10%] w-[60%] h-[60%] bg-blue-600/20 blur-[150px] rounded-full"
            />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 -right-[10%] w-[50%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full"
            />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b44_1px,transparent_1px),linear-gradient(to_bottom,#1e293b44_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            {/* Nodes and Connections */}
            <svg className="absolute inset-0 w-full h-full opacity-40">
                <defs>
                    <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {[...Array(12)].map((_, i) => (
                    <motion.g key={i}>
                        <motion.circle
                            cx={Math.random() * 100 + "%"}
                            cy={Math.random() * 100 + "%"}
                            r={Math.random() * 3 + 1}
                            fill="#3b82f6"
                            initial={{ opacity: 0.2 }}
                            animate={{
                                opacity: [0.2, 0.8, 0.2],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                        />
                        <motion.line
                            x1={Math.random() * 100 + "%"}
                            y1={Math.random() * 100 + "%"}
                            x2={Math.random() * 100 + "%"}
                            y2={Math.random() * 100 + "%"}
                            stroke="url(#line-grad)"
                            strokeWidth="0.5"
                            animate={{
                                opacity: [0, 0.3, 0],
                                x1: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                                y2: [Math.random() * 100 + "%", Math.random() * 100 + "%"]
                            }}
                            transition={{
                                duration: Math.random() * 15 + 15,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </motion.g>
                ))}
            </svg>

            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                        }}
                        animate={{
                            opacity: [0, 0.4, 0],
                            y: ["-10%", "110%"],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 20,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                        }}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full blur-[1px]"
                    />
                ))}
            </div>
        </div>
    );
}
