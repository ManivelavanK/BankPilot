import { motion } from "framer-motion";
import { Info, BarChart3, Target, Zap, Brain } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const explanationData = [
    { factor: 'Financial Stability', weight: 45, impact: 'High Positive', color: '#10b981' },
    { factor: 'Market Reputation', weight: 25, impact: 'Positive', color: '#3b82f6' },
    { factor: 'Management Quality', weight: 15, impact: 'Neutral', color: '#6366f1' },
    { factor: 'Industry Outlook', weight: 10, impact: 'Neutral', color: '#8b5cf6' },
    { factor: 'Legal Scrutiny', weight: 5, impact: 'Positive', color: '#06b6d4' },
];

export function DecisionExplainability() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-[32px] border border-white/40 shadow-2xl overflow-hidden mb-8"
        >
            <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-white/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#1E293B]">Explainable AI (XAI) Dashboard</h3>
                            <p className="text-sm text-slate-500 font-medium tracking-tight">Deconstructing Neural Decision Vectors</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
                        <Info className="w-4 h-4 text-slate-400" />
                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">SHAP Value Inference</span>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-600" />
                            Feature Contribution Analysis
                        </h4>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={explanationData} layout="vertical" margin={{ left: 40 }}>
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="factor"
                                        type="category"
                                        axisLine={false}
                                        tickLine={false}
                                        width={120}
                                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-[#1E293B] text-white p-3 rounded-xl shadow-2xl border border-white/10">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">{payload[0].payload.factor}</p>
                                                        <p className="text-sm font-bold">Contribution: {payload[0].value}%</p>
                                                        <p className="text-[10px] text-emerald-400 font-bold uppercase mt-1">Impact: {payload[0].payload.impact}</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Bar dataKey="weight" radius={[0, 8, 8, 0]} barSize={24}>
                                        {explanationData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-slate-50/50 rounded-[24px] border border-slate-100">
                            <h5 className="text-[12px] font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-amber-500" />
                                Neural reasoning flow
                            </h5>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[10px] font-black border border-slate-100">01</div>
                                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                        <span className="font-bold text-slate-900">Primary Data:</span> Financial statements show a robust 2.1x DSCR, providing the strongest approval weight.
                                    </p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[10px] font-black border border-slate-100">02</div>
                                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                        <span className="font-bold text-slate-900">External Pulse:</span> Web Intelligence Agent identified positive expansion news, offsetting moderate legal risk scores.
                                    </p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[10px] font-black border border-slate-100">03</div>
                                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                        <span className="font-bold text-slate-900">Human Overlay:</span> Credit Officer notes on "Promoter Transparency" were factored into the final sentiment weighting.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-[24px] text-white shadow-xl shadow-blue-500/20">
                            <div className="flex items-center gap-3 mb-3">
                                <BarChart3 className="w-5 h-5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Confidence Score Decomposition</span>
                            </div>
                            <p className="text-2xl font-black mb-2">92.4% <span className="text-sm font-medium opacity-60">Consensus</span></p>
                            <p className="text-[11px] font-medium leading-relaxed opacity-80">
                                Decision is "High Confidence" based on cross-verification of 128 multi-source data points with <span className="bg-white/20 px-1 rounded">0.02%</span> variance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
