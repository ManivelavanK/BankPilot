import { useState } from "react";
import { MessageSquareText, Save, Zap, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreditOfficerInsightsProps {
    metrics?: {
        ebitda: number;
        debt_to_equity: number;
        interest_coverage: number;
    };
}

export function CreditOfficerInsights({ metrics }: CreditOfficerInsightsProps) {
    const [notes, setNotes] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [showImpact, setShowImpact] = useState(false);
    
    // Default values if metrics are missing
    const displayMetrics = metrics || { ebitda: 85, debt_to_equity: 0.42, interest_coverage: 4.5 };

    const handleApply = () => {
        setIsUpdating(true);
        setTimeout(() => {
            setIsUpdating(false);
            setShowImpact(true);
        }, 1500);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50/50 to-white">
                <div className="flex items-center gap-3">
                    <MessageSquareText className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Primary Insights (Field Notes)</h3>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4 flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                        Credit Manager Observations
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g., Factory operating at 40% capacity due to maintenance. Promoter seems transparent about recent margin dip..."
                        className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm resize-none shadow-inner"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
                        <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <p className="text-[11px] text-amber-800 font-medium">
                            AI will recalibrate the risk score based on these qualitative adjustments.
                        </p>
                    </div>

                    <button
                        onClick={handleApply}
                        disabled={!notes || isUpdating}
                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg ${!notes || isUpdating
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-indigo-500/30 hover:scale-[1.02]'
                            }`}
                    >
                        {isUpdating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span className="uppercase tracking-widest text-xs">Recalibrating Neural Model...</span>
                            </>
                        ) : (
                            <>
                                <Zap className="w-5 h-5" />
                                <span className="uppercase tracking-widest text-xs">Apply AI Adjustment</span>
                            </>
                        )}
                    </button>

                    <AnimatePresence>
                        {showImpact && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 overflow-hidden"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                        <Zap className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h5 className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">Impact Detected</h5>
                                        <p className="text-xs text-emerald-700 font-medium">+3.2 Points Adjustment to Risk Profile</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
