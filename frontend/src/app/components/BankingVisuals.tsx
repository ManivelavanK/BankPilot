import { motion } from 'framer-motion';

export function CreditGauge({ score = 750 }) {
    const percentage = (score / 900) * 100;
    return (
        <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-slate-200"
                />
                <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray="440"
                    initial={{ strokeDashoffset: 440 }}
                    whileInView={{ strokeDashoffset: 440 - (440 * percentage) / 100 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-[#14B8A6]"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-2xl font-black font-heading text-slate-800"
                >
                    {score}
                </motion.span>
                <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Credit Score</span>
            </div>
        </div>
    );
}

export function GrowthGraphMini() {
    return (
        <div className="w-full h-24 relative overflow-hidden bg-white/50 rounded-2xl border border-slate-100 p-4">
            <svg className="w-full h-full" viewBox="0 0 100 40">
                <motion.path
                    d="M0,35 Q10,30 20,32 T40,25 T60,20 T80,10 T100,5"
                    fill="none"
                    stroke="#1E88E5"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.path
                    d="M0,35 Q10,30 20,32 T40,25 T60,20 T80,10 T100,5 L100,40 L0,40 Z"
                    fill="url(#gradientArea)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.1 }}
                    transition={{ duration: 1 }}
                />
                <defs>
                    <linearGradient id="gradientArea" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1E88E5" />
                        <stop offset="100%" stopColor="#1E88E5" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
