import React from 'react';
import { AlertCircle, AlertTriangle, TrendingDown, Scale, Clock, ShieldAlert, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from './MotionUtils';

// ── Static demo signals (shown when no real data exists yet) ─────────────────
const staticEwsSignals = [
    {
        icon: Scale,
        title: "Promoter litigation detected",
        severity: "CRITICAL",
        desc: "Active case in NCLT involving principal promoter",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200"
    },
    {
        icon: TrendingDown,
        title: "GST turnover decline 34% (YoY)",
        severity: "HIGH",
        desc: "Significant drop in monthly filings compared to FY24-25 average",
        color: "text-red-500",
        bgColor: "bg-red-50/50",
        borderColor: "border-red-100"
    },
    {
        icon: ShieldAlert,
        title: "Debt/Equity ratio baseline breached",
        severity: "MEDIUM",
        desc: "Current ratio at 2.45x exceeds industry benchmark of 2.0x",
        color: "text-amber-500",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200"
    },
    {
        icon: AlertTriangle,
        title: "Negative news sentiment detected",
        severity: "WARN",
        desc: "Sudden spike in negative mentions regarding supply chain delays",
        color: "text-amber-500",
        bgColor: "bg-amber-50/50",
        borderColor: "border-amber-100"
    },
    {
        icon: Clock,
        title: "Delayed bank repayments (SMA-0)",
        severity: "CRITICAL",
        desc: "Technical default detected in internal reporting status",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200"
    }
];

// ── Helpers to build dynamic signal objects from real backend data ────────────
function severityFromType(type: string) {
    if (type === 'high') return 'CRITICAL';
    if (type === 'medium') return 'HIGH';
    return 'WARN';
}

function colorsFromSeverity(severity: string) {
    if (severity === 'CRITICAL') return { color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
    if (severity === 'HIGH') return { color: 'text-red-500', bgColor: 'bg-red-50/50', borderColor: 'border-red-100' };
    if (severity === 'MEDIUM') return { color: 'text-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' };
    return { color: 'text-amber-500', bgColor: 'bg-amber-50/50', borderColor: 'border-amber-100' };
}

interface EarlyWarningSignalsProps {
    /** backend recent_alerts array: [{id, type, message}] */
    alerts?: { id: number | string; type: string; message: string }[];
    /** aggregated fraud_flags from all history records */
    fraudFlags?: string[];
}

const EarlyWarningSignals: React.FC<EarlyWarningSignalsProps> = ({ alerts = [], fraudFlags = [] }) => {
    // Build a unified list of dynamic signals from real data
    const dynamicSignals: any[] = [];

    // From recent_alerts
    alerts.forEach(alert => {
        const severity = severityFromType(alert.type);
        const colors = colorsFromSeverity(severity);
        dynamicSignals.push({
            icon: AlertTriangle,
            title: alert.message,
            severity,
            desc: `System alert · ID ${alert.id}`,
            ...colors,
        });
    });

    // Deduplicate and add fraud flags from history
    const seenFlags = new Set<string>();
    fraudFlags.forEach(flag => {
        if (seenFlags.has(flag)) return;
        seenFlags.add(flag);
        const colors = colorsFromSeverity('HIGH');
        dynamicSignals.push({
            icon: ShieldAlert,
            title: flag,
            severity: 'HIGH',
            desc: 'Fraud / anomaly flag detected during AI analysis',
            ...colors,
        });
    });

    // Use real data if available; otherwise show static demo signals
    const signals = dynamicSignals.length > 0 ? dynamicSignals : staticEwsSignals;
    const hasRealData = dynamicSignals.length > 0;
    const alertCount = signals.length;

    return (
        <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-md rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-6 hover:shadow-xl transition-all border border-white/20 h-full"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-bold text-[#1E293B] flex items-center gap-2 uppercase tracking-wider">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Early Warning Risk Signals
                </h3>
                <div className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${
                    hasRealData && alertCount > 0
                        ? 'bg-red-100 text-red-700 animate-pulse'
                        : 'bg-gray-100 text-gray-500'
                }`}>
                    {alertCount} {hasRealData ? 'Live' : 'Demo'} Alert{alertCount !== 1 ? 's' : ''}
                </div>
            </div>

            {!hasRealData && (
                <div className="mb-4 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">
                        Demo signals — real alerts appear after document analysis
                    </p>
                </div>
            )}

            <div className="space-y-3">
                {signals.map((signal, index) => {
                    const Icon = signal.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-3.5 rounded-2xl border ${signal.borderColor} ${signal.bgColor} transition-all hover:scale-[1.02] cursor-pointer group hover:bg-white hover:shadow-md`}
                        >
                            <div className="flex gap-4">
                                <div className={`p-2 rounded-xl bg-white shadow-sm self-start group-hover:scale-110 transition-transform ${signal.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <p className="font-bold text-[#1E293B] text-sm group-hover:text-blue-600 transition-colors">
                                            {signal.title}
                                        </p>
                                        <span className={`text-[9px] font-black uppercase tracking-[0.1em] ${signal.color} px-1.5 py-0.5 bg-white/50 rounded-md`}>
                                            {signal.severity}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-[#64748B] font-medium leading-relaxed">
                                        {signal.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-8 flex flex-col gap-3">
                <button className="w-full py-3 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-[#1e40af] hover:to-[#0891b2] rounded-xl text-[11px] font-bold text-white uppercase tracking-[0.12em] transition-all hover:shadow-lg shadow-md group">
                    Generate Full Risk Analysis
                    <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                </button>
                <p className="text-[9px] text-[#64748B] text-center font-semibold uppercase tracking-widest">
                    {hasRealData
                        ? `Live data · auto-refreshes every 30s`
                        : 'Upload documents to see live alerts'}
                </p>
            </div>
        </motion.div>
    );
};

export default EarlyWarningSignals;
