import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { Hexagon, ShieldCheck } from 'lucide-react';

interface FiveCsRadarChartProps {
    scores?: {
        character: number;
        capacity: number;
        capital: number;
        collateral: number;
        conditions: number;
    };
    title?: string;
}

const FiveCsRadarChart: React.FC<FiveCsRadarChartProps> = ({
    scores = { character: 85, capacity: 82, capital: 78, collateral: 75, conditions: 88 },
    title = "Five Cs of Credit Assessment"
}) => {
    const data = [
        { subject: 'Character', score: scores.character, fullMark: 100 },
        { subject: 'Capacity', score: scores.capacity, fullMark: 100 },
        { subject: 'Capital', score: scores.capital, fullMark: 100 },
        { subject: 'Collateral', score: scores.collateral, fullMark: 100 },
        { subject: 'Conditions', score: scores.conditions, fullMark: 100 },
    ];

    const averageScore = Math.round(
        Object.values(scores).reduce((a, b) => a + b, 0) / 5
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-md rounded-[32px] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden h-full group flex flex-col"
        >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/50 to-white/50">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
                        <Hexagon className="w-5 h-5 fill-blue-500/20" />
                    </div>
                    <h3 className="text-lg font-black text-[#1E293B] tracking-tight uppercase tracking-wider">{title}</h3>
                </div>
                <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm border border-emerald-200/50">
                    Profile Strength: {averageScore}%
                </div>
            </div>

            <div className="flex-1 p-4 flex flex-col items-center justify-center min-h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
                        />
                        <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            tick={false}
                            axisLine={false}
                        />
                        <Radar
                            name="Credit Score"
                            dataKey="score"
                            stroke="#2563EB"
                            strokeWidth={3}
                            fill="url(#radarGradient)"
                            fillOpacity={0.6}
                        />
                        <defs>
                            <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.4} />
                            </linearGradient>
                        </defs>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-[#1E293B] text-white px-4 py-2 rounded-xl shadow-2xl border border-white/10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-0.5">
                                                {payload[0].payload.subject}
                                            </p>
                                            <p className="text-lg font-black">{payload[0].value}<span className="text-[10px] opacity-60 ml-0.5">/ 100</span></p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="p-6 bg-slate-50/50 border-t border-slate-100 grid grid-cols-5 gap-2">
                {data.map((item, i) => (
                    <div key={i} className="text-center">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1 truncate">{item.subject}</p>
                        <p className="text-sm font-black text-slate-800">{item.score}</p>
                    </div>
                ))}
            </div>

            <div className="px-6 py-4 bg-blue-600 flex items-center justify-center gap-2 group-hover:bg-blue-700 transition-colors cursor-pointer">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Validated Credit Profile</span>
            </div>
        </motion.div>
    );
};

export default FiveCsRadarChart;
