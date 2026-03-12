import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const PATHS = [
    "M -100,200 C 200,100 400,300 600,200 S 1000,100 1400,200",
    "M -100,400 C 300,300 500,500 800,400 S 1200,300 1600,400",
    "M -100,600 C 150,700 450,500 750,600 S 1100,700 1500,600",
    "M 200,-100 C 300,200 100,400 200,600 S 300,1000 200,1400",
    "M 1200,-100 C 1100,200 1300,400 1200,600 S 1100,1000 1200,1400"
];

const STAGES = [
    { name: "Company Input", x: "15%", y: "20%" },
    { name: "Bank Data", x: "40%", y: "35%" },
    { name: "AI Credit Engine", x: "65%", y: "55%" },
    { name: "Loan Decision", x: "85%", y: "30%" }
];

export function FinancialPipeline() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const visiblePaths = isMobile ? PATHS.slice(0, 2) : PATHS;
    const particleCountPerPath = isMobile ? 1 : 2;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Layer 2: Curved Data Paths */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#1E88E5" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>

                    {/* Filter for particle glow */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {visiblePaths.map((path, i) => (
                    <motion.path
                        key={`path-${i}`}
                        d={path}
                        fill="none"
                        stroke="url(#pathGradient)"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.25 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                ))}
            </svg>

            {/* Layer 3: Moving Data Particles with Trails */}
            {visiblePaths.map((path, pathIdx) => (
                [...Array(particleCountPerPath)].map((_, groupIdx) => (
                    <div key={`packet-${pathIdx}-${groupIdx}`}>
                        {/* Main Particle and Trails */}
                        {[0, 1, 2].map((trailIdx) => (
                            <motion.div
                                key={`particle-${pathIdx}-${groupIdx}-${trailIdx}`}
                                initial={{ offsetDistance: "0%", opacity: 0 }}
                                animate={{
                                    offsetDistance: "100%",
                                    opacity: trailIdx === 0 ? [0, 1, 1, 0] : [0, 0.4, 0.4, 0]
                                }}
                                transition={{
                                    duration: 7 + pathIdx,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: groupIdx * 4 + pathIdx + (trailIdx * 0.15)
                                }}
                                style={{
                                    offsetPath: `path('${path}')`,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    scale: trailIdx === 0 ? 1 : 0.8 - (trailIdx * 0.2)
                                }}
                                className={`rounded-full shadow-[0_0_12px_rgba(56,189,248,0.8)] ${trailIdx === 0
                                        ? "w-[6px] h-[6px] bg-[#38BDF8] z-20"
                                        : "w-[4px] h-[4px] bg-[#38BDF8]/40 z-10"
                                    }`}
                            />
                        ))}
                    </div>
                ))
            ))}

            {/* AI Processing Nodes */}
            {STAGES.map((stage, i) => (
                <div
                    key={`node-${i}`}
                    className="absolute flex flex-col items-center"
                    style={{ top: stage.y, left: stage.x }}
                >
                    {/* Node Glow/Pulse */}
                    <div className="relative">
                        <motion.div
                            animate={{
                                scale: [1, 1.8, 1],
                                opacity: [0.2, 0.1, 0.2]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-[#14B8A6]/20 rounded-full blur-xl"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                boxShadow: [
                                    "0 0 10px rgba(20,184,166,0.6)",
                                    "0 0 20px rgba(20,184,166,0.9)",
                                    "0 0 10px rgba(20,184,166,0.6)"
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                            className="relative w-[10px] h-[10px] bg-[#14B8A6] rounded-full z-30"
                        />
                    </div>

                    {/* Label */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.35 }}
                        className="mt-4 text-[9px] font-black uppercase tracking-[0.3em] text-[#0B3D5B] text-center whitespace-nowrap"
                    >
                        {stage.name}
                    </motion.div>
                </div>
            ))}
        </div>
    );
}
