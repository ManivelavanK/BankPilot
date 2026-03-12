import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle, FileCheck, Building2, UserCheck, BarChart3, ShieldCheck, Map } from 'lucide-react';
import { Link } from 'react-router';
import { fadeInUp } from './MotionUtils';

interface CAMPreviewPanelProps {
    applicationId: string;
    companyName?: string;
    analysisData?: any;
}

const CAMPreviewPanel: React.FC<CAMPreviewPanelProps> = ({ applicationId, companyName = "Aether Dynamics Pvt Ltd", analysisData }) => {
    const previewData = analysisData ? [
        {
            title: "Character",
            icon: UserCheck,
            content: `Bureau score of ${analysisData.risk_analysis.extracted_data.director_credit_score} verified. ${analysisData.risk_analysis.risk_factors.find((r: string) => r.includes('Bureau')) || 'Clean credit history.'}`,
            color: "blue"
        },
        {
            title: "Capacity",
            icon: BarChart3,
            content: `Debt-to-Asset ratio at ${(analysisData.risk_analysis.capacity_score / 100).toFixed(2)}. ${analysisData.risk_analysis.risk_factors.find((r: string) => r.includes('leverage')) || 'Manageable debt levels.'}`,
            color: "emerald"
        },
        {
            title: "Capital",
            icon: ShieldCheck,
            content: `Revenue of ₹${(analysisData.risk_analysis.extracted_data.revenue / 10000000).toFixed(2)} Cr with favorable profit margins.`,
            color: "purple"
        },
        {
            title: "Collateral",
            icon: Building2,
            content: `Primary security worth ₹${(analysisData.risk_analysis.extracted_data.collateral_value / 100000).toFixed(2)}L offered.`,
            color: "orange"
        },
        {
            title: "Conditions",
            icon: Map,
            content: `${analysisData.risk_analysis.research_intelligence[0] || 'Positive sector tailwinds identified.'}`,
            color: "cyan"
        }
    ] : [
        {
            title: "Character",
            icon: UserCheck,
            content: "Promoter group has 15+ years of high-precision manufacturing expertise with zero default history.",
            color: "blue"
        },
        {
            title: "Capacity",
            icon: BarChart3,
            content: "Demonstrated 24% YoY EBITDA growth with verified export orders from Boeing & Airbus supply chains.",
            color: "emerald"
        },
        {
            title: "Capital",
            icon: ShieldCheck,
            content: "Robust net worth after recent ₹50 Cr institutional funding round. Posting healthy 1.2x current ratio.",
            color: "purple"
        },
        {
            title: "Collateral",
            icon: Building2,
            content: "Industrial CNC facility in Pune SEZ worth ₹45 Cr (1.8x coverage) offered as primary security.",
            color: "orange"
        },
        {
            title: "Conditions",
            icon: Map,
            content: "Positive sector tailwinds from 'Make in India' defense policies. Low sensitivity to raw material price volatility.",
            color: "cyan"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-xl rounded-[32px] border border-slate-200 shadow-xl overflow-hidden h-full flex flex-col"
        >
            {/* Draft Header */}
            <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-emerald-50/50 to-white/50 min-h-[120px] flex items-center">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4 text-left">
                        <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-500/20 shrink-0">
                            <FileCheck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#1E293B] leading-tight">CAM Generation Preview</h3>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] mt-1">Automated Report Pre-submission Draft</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="mb-8">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Subject Entity</div>
                    <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-lg font-bold text-slate-800">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        {companyName}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {previewData.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-[11px] font-black text-[#1E293B] uppercase tracking-widest">{item.title}</span>
                                </div>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                    {item.content}
                                </p>
                            </motion.div>
                        );
                    })}

                    <div className="p-1">
                        <Link
                            to={`/app/cam/${applicationId}`}
                            className="h-full w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-emerald-200 rounded-3xl bg-emerald-50/20 hover:bg-emerald-50 hover:border-emerald-500 transition-all group group"
                        >
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Download className="w-6 h-6 text-emerald-600" />
                            </div>
                            <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest text-center">Download Official<br />CAM Report (PDF)</p>
                        </Link>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center">
                    <div className="flex items-center gap-8 py-3 px-8 bg-slate-900 rounded-2xl shadow-xl shadow-slate-200">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Sanction Confidence</span>
                            <span className="text-xl font-black text-white">94.2%</span>
                        </div>
                        <div className="w-px h-8 bg-slate-800" />
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Processing Time</span>
                            <span className="text-xl font-black text-white">12s</span>
                        </div>
                        <div className="w-px h-8 bg-slate-800" />
                        <div className="flex flex-col items-center text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Human-in-Loop</span>
                            <span className="text-sm font-black text-emerald-400 uppercase">Verified</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-8 py-4 bg-emerald-600 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">End-to-End Automation Pipeline Complete</span>
                </div>
                <Link to={`/app/cam/${applicationId}`} className="text-[10px] font-black text-white uppercase tracking-widest hover:underline flex items-center gap-2">
                    Proceed to Final Review
                    <FileText className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
};

export default CAMPreviewPanel;
