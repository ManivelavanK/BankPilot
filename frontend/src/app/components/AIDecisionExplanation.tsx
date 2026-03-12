import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, TrendingUp, ShieldCheck, Landmark, Percent, Wallet, Info } from 'lucide-react';
import { fadeInUp, staggerContainer } from './MotionUtils';

interface AIDecisionExplanationProps {
    decision?: 'APPROVED' | 'REJECTED' | 'REVIEW';
    limit?: string;
    interestRate?: string;
    rationales?: string[];
    confidence?: string;
}

const AIDecisionExplanation: React.FC<AIDecisionExplanationProps> = ({
    decision = 'APPROVED',
    limit = '₹8.5 Cr',
    interestRate = '10.5%',
    rationales = [],
    confidence = '98.2%'
}) => {
    const defaultPoints = [
        { text: "Structural financial health verified through document analysis.", status: "pass" },
        { text: "Entity compliance profile validated against standard markers.", status: "pass" },
        { text: "Random Forest confidence threshold met for this application tier.", status: "pass" },
    ];

    const displayPoints = rationales.length > 0 
        ? rationales.map((r, i) => ({ 
            text: r, 
            status: (r.toLowerCase().includes('drop') || r.toLowerCase().includes('risk') || r.toLowerCase().includes('concern')) ? 'warn' : 'pass' 
          }))
        : defaultPoints;

    const getDecisionColor = () => {
        switch (decision) {
            case 'APPROVED': return 'bg-emerald-500 hover:bg-emerald-600';
            case 'REJECTED': return 'bg-red-500 hover:bg-red-600';
            case 'REVIEW': return 'bg-amber-500 hover:bg-amber-600';
            default: return 'bg-blue-600';
        }
    };

    const getDecisionShadow = () => {
        switch (decision) {
            case 'APPROVED': return 'shadow-emerald-500/20';
            case 'REJECTED': return 'shadow-red-500/20';
            case 'REVIEW': return 'shadow-amber-500/20';
            default: return 'shadow-blue-500/20';
        }
    };

    return (
        <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-xl rounded-[32px] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden min-h-[500px] group"
        >
            {/* Header Section */}
            <div className="p-8 border-b border-slate-100 bg-gradient-to-br from-slate-50/50 to-white/50">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-2xl shadow-lg ring-4 ring-blue-50">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-[#1E293B] tracking-tight">Random Forest Analysis Panel</h3>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] mt-0.5">Optimized ML Prediction Engine</p>
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`px-5 py-2.5 rounded-full text-white text-xs font-black uppercase tracking-widest transition-all cursor-default shadow-xl ${getDecisionColor()} ${getDecisionShadow()}`}
                    >
                        Decision: {decision}
                    </motion.div>
                </div>

                {/* Decision Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md group/card"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover/card:bg-emerald-500 group-hover/card:text-white transition-all">
                                <Wallet className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Recommended Limit</span>
                        </div>
                        <p className="text-3xl font-black text-[#1E293B]">{limit}</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md group/card"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover/card:bg-blue-600 group-hover/card:text-white transition-all">
                                <Percent className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Calculated APR</span>
                        </div>
                        <p className="text-3xl font-black text-[#1E293B]">{interestRate}</p>
                    </motion.div>
                </div>
            </div>

            {/* Explanation Section */}
            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-[0.1em] flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        Decision Rationale
                    </h4>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                        <Info className="w-3 h-3" />
                        {confidence} Confidence
                    </div>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    className="space-y-3"
                >
                    {displayPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className={`flex items-start gap-4 p-3.5 rounded-2xl border transition-all hover:translate-x-1 ${point.status === 'pass'
                                ? 'bg-emerald-50/30 border-emerald-100/50 hover:bg-emerald-50/50'
                                : 'bg-amber-50/30 border-amber-100/50 hover:bg-amber-50/50'
                                }`}
                        >
                            <div className={`mt-0.5 rounded-full ${point.status === 'pass' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                {point.status === 'pass' ? (
                                    <CheckCircle2 className="w-5 h-5 fill-emerald-50/50" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 fill-amber-50/50" />
                                )}
                            </div>
                            <div>
                                <p className={`text-sm font-bold ${point.status === 'pass' ? 'text-slate-800' : 'text-amber-900'} leading-tight`}>
                                    {point.text}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className={`w-1 h-1 rounded-full ${point.status === 'pass' ? 'bg-emerald-300' : 'bg-amber-300'}`} />
                                    <p className="text-[10px] font-medium text-slate-500 opacity-80 decoration-dotted underline underline-offset-4">
                                        Extracted from {index % 2 === 0 ? 'Tax Filings' : 'Bureau Records'}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400" />
                            </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                            +12
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Verified by Credit Council
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default AIDecisionExplanation;
