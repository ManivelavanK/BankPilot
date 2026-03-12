import { Globe, ShieldAlert, Newspaper, TrendingDown, Scale, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./MotionUtils";

const researchNews = [
    {
        source: "Economic Times",
        title: "TechVentures expands footprint in European markets",
        sentiment: "positive",
        category: "Expansion",
        time: "12h ago"
    },
    {
        source: "MCA Filings",
        title: "Annual Returns for FY24 filed successfully",
        sentiment: "positive",
        category: "Compliance",
        time: "2d ago"
    },
    {
        source: "eCourts Services",
        title: "Civil dispute resolved (Case #4021/2023) - Clean slate",
        sentiment: "positive",
        category: "Legal",
        time: "1w ago"
    },
    {
        source: "Sector Pulse",
        title: "IT Services growth projected to hit 14% in FY26",
        sentiment: "positive",
        category: "Market",
        time: "3h ago"
    }
];

const promoterInsights = [
    {
        name: "Dr. Arvind Sharma",
        role: "Managing Director",
        finding: "Clear background with no political affiliations or negative news mentions.",
        status: "Clean"
    },
    {
        name: "Meera Reddy",
        role: "CTO",
        finding: "Formerly VP at GlobalTech; strong industry reputation for scaling SaaS.",
        status: "Verified"
    }
];

interface WebIntelligenceProps {
    searchFindings?: string[];
}

export function WebIntelligence({ searchFindings = [] }: WebIntelligenceProps) {
    const displayNews = searchFindings.length > 0 
        ? searchFindings.map((finding, i) => ({
            source: "AI Research",
            title: finding,
            sentiment: "positive",
            category: "Compliance",
            time: "Just now"
          }))
        : researchNews;

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-[24px] border border-white/40 shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-emerald-50/50 to-white/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Globe className="w-6 h-6 text-emerald-600" />
                        <h3 className="text-[14px] font-bold text-[#1E293B] uppercase tracking-widest">Digital Research Agent</h3>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100/50 rounded-full">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tighter">Live Web Scraping Active</span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Market Intelligence */}
                    <div>
                        <h4 className="text-[12px] font-bold text-[#1E293B] uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Newspaper className="w-4 h-4 text-blue-600" />
                            Web Intelligence & News
                        </h4>
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="space-y-4"
                        >
                            {displayNews.map((news, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-md transition-all group cursor-pointer"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded uppercase tracking-tighter">
                                            {news.source}
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-medium">{news.time}</span>
                                    </div>
                                    <h5 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                                        {news.title}
                                    </h5>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${news.sentiment === 'positive' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                            <span className="text-[10px] font-bold text-gray-600 uppercase">{news.category} Risk: Low</span>
                                        </div>
                                        <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Promoter & Corporate Governance */}
                    <div>
                        <h4 className="text-[12px] font-bold text-[#1E293B] uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Scale className="w-4 h-4 text-emerald-600" />
                            Promoter & Governance Scrutiny
                        </h4>
                        <div className="space-y-6">
                            {promoterInsights.map((promoter, i) => (
                                <div key={i} className="relative pl-6 border-l-2 border-emerald-100">
                                    <div className="absolute top-0 -left-1.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                                    <div className="flex items-center justify-between mb-1">
                                        <h5 className="font-bold text-gray-900">{promoter.name}</h5>
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded uppercase tracking-tighter">
                                            {promoter.status}
                                        </span>
                                    </div>
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase mb-2 tracking-tighter">{promoter.role}</p>
                                    <p className="text-xs text-slate-600 leading-relaxed bg-emerald-50/30 p-3 rounded-xl border border-emerald-50/50">
                                        {promoter.finding}
                                    </p>
                                </div>
                            ))}

                            {/* MCA eCourts Summary */}
                            <div className="mt-8 p-5 bg-[#1E293B] rounded-2xl text-white shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                                    <ShieldAlert className="w-16 h-16" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Scale className="w-4 h-4 text-emerald-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Legal Health Score</span>
                                    </div>
                                    <div className="flex items-end gap-3 mb-4">
                                        <span className="text-3xl font-black">98</span>
                                        <span className="text-emerald-400 text-sm font-bold mb-1">/ 100</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 font-medium">
                                        No active litigation found in eCourts for company or directors. Zero MCA compliance alerts in last 24 months.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
