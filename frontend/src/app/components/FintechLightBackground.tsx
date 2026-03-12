import { motion } from 'framer-motion';
import { DollarSign, BarChart2, TrendingUp, ShieldCheck, Database, Landmark, Percent } from 'lucide-react';
import { FinancialPipeline } from './FinancialPipeline';

export function FintechLightBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none -z-10 bg-[#F4F8FB] overflow-hidden">
            {/* Layer 1: Blurred Gradient Orbs */}
            <div className="absolute inset-0">
                <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vh] bg-blue-400/10 blur-[150px] rounded-full mix-blend-multiply" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vh] bg-[#14B8A6]/10 blur-[180px] rounded-full mix-blend-multiply" />
                <div className="absolute top-[30%] right-[10%] w-[50vw] h-[50vh] bg-indigo-400/5 blur-[120px] rounded-full mix-blend-multiply" />
                <div className="absolute bottom-[10%] left-[20%] w-[60vw] h-[60vh] bg-teal-400/10 blur-[140px] rounded-full mix-blend-multiply" />
            </div>

            {/* Layer 2 & 3: Curved Data Paths and Moving Particles */}
            <FinancialPipeline />

            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(#0B3D5B 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

            {/* Floating Banking Icons (Top Layer of background) */}
            <div className="absolute inset-0">
                {[
                    { Icon: Landmark, top: "8%", left: "12%" },
                    { Icon: DollarSign, top: "22%", left: "85%" },
                    { Icon: BarChart2, top: "68%", left: "15%" },
                    { Icon: Percent, top: "82%", left: "78%" },
                    { Icon: ShieldCheck, top: "18%", left: "62%" },
                    { Icon: Database, top: "62%", left: "82%" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        style={{ top: item.top, left: item.left }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.03, 0.08, 0.03],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 10 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute text-[#0B3D5B]"
                    >
                        <item.Icon className="w-14 h-14" />
                    </motion.div>
                ))}
            </div>

            {/* Data Glow Accents */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0.05, 0.15, 0.05],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute w-2 h-2 bg-[#14B8A6]/20 rounded-full blur-[2px]"
                    />
                ))}
            </div>
        </div>
    );
}
