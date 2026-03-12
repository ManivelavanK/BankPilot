import { useState } from "react";
import { Link, useParams } from "react-router";
import { Brain, AlertTriangle, CheckCircle, ArrowRight, Shield, Activity, Target, Zap, TrendingUp, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts';
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from '../components/MotionUtils';
import { WebIntelligence } from '../components/WebIntelligence';
import { CreditOfficerInsights } from '../components/CreditOfficerInsights';
import { DecisionExplainability } from '../components/DecisionExplainability';
import AIDecisionExplanation from "../components/AIDecisionExplanation";
import FiveCsRadarChart from "../components/FiveCsRadarChart";
import CAMPreviewPanel from "../components/CAMPreviewPanel";


const revenueData = [
  { quarter: 'Q1 2024', revenue: 45, profit: 8 },
  { quarter: 'Q2 2024', revenue: 52, profit: 10 },
  { quarter: 'Q3 2024', revenue: 48, profit: 7 },
  { quarter: 'Q4 2024', revenue: 55, profit: 11 },
  { quarter: 'Q1 2025', revenue: 58, profit: 12 },
  { quarter: 'Q2 2025', revenue: 62, profit: 14 },
];

const riskRadarData = [
  { category: 'Financial Health', score: 90, fullMark: 100 },
  { category: 'Legal Risk', score: 65, fullMark: 100 },
  { category: 'Operational Risk', score: 70, fullMark: 100 },
  { category: 'Market Risk', score: 75, fullMark: 100 },
  { category: 'Digital Research', score: 98, fullMark: 100 },
];

const industryBenchmark = [
  { metric: 'Profit Margin', company: 22, industry: 15 },
  { metric: 'Debt Ratio', company: 0.8, industry: 1.2 },
  { metric: 'Revenue Growth', company: 18, industry: 12 },
  { metric: 'Liquidity Ratio', company: 1.8, industry: 1.4 },
];

export function AIAnalysis() {
  const { applicationId } = useParams();
  const [loanAmount, setLoanAmount] = useState(8.5);

  const calculateRiskScore = (amount: number) => {
    if (amount <= 2) return 85;
    if (amount <= 3) return 76;
    if (amount <= 5) return 68;
    return 48;
  };

  const calculateApprovalStatus = (score: number) => {
    if (score >= 70) return { status: 'APPROVED', color: 'emerald' };
    if (score >= 50) return { status: 'REVIEW REQUIRED', color: 'amber' };
    return { status: 'HIGH RISK', color: 'red' };
  };

  const calculateInterestRate = (score: number) => {
    if (score >= 80) return 9.5;
    if (score >= 70) return 10.5;
    if (score >= 60) return 11.5;
    return 13.0;
  };

  const riskScore = calculateRiskScore(loanAmount);
  const approval = calculateApprovalStatus(riskScore);
  const interestRate = calculateInterestRate(riskScore);
  const totalRiskScore = Math.round((90 + 65 + 70 + 75 + 98) / 5);

  return (
    <div className="p-8 bg-transparent relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Link to="/app" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-900">{applicationId}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Analysis Complete</h1>
              <p className="text-gray-600">Aether Dynamics Pvt Ltd • ₹{loanAmount} Cr Loan Application</p>
            </div>
            <Link
              to={`/app/cam/${applicationId}`}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              Generate CAM Report
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 mb-8 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <motion.div
            animate={{ x: ['100%', '-100%'] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute top-0 bottom-0 w-32 bg-white/20 blur-2xl -skew-x-12"
          />
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-xl group-hover:scale-110 transition-transform duration-500">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-white mb-1 tracking-tight">AI Neural Link Verified</h4>
              <p className="text-blue-100/80 text-sm font-medium">
                Extracted 32 Data Nodes • Neural Inference: 42ms • Integrity Confidence: 92%
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <AIDecisionExplanation
              decision={approval.status as 'APPROVED' | 'REJECTED' | 'REVIEW'}
              limit={`₹${loanAmount} Cr`}
              interestRate={`${interestRate}%`}
            />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Risk Intelligence</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Total Credit Risk Score</p>
                <div className="relative inline-block">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                    <circle cx="64" cy="64" r="56" stroke="#10b981" strokeWidth="12" fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - totalRiskScore / 100)}`}
                      className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{totalRiskScore}</span>
                    <span className="text-xs text-gray-500">/ 100</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {riskRadarData.map((item) => (
                  <div key={item.category} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.category}</span>
                      <span className={`text-sm font-bold ${item.score >= 80 ? 'text-emerald-600' : item.score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{item.score}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${item.score >= 80 ? 'bg-emerald-500' : item.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DecisionExplainability />

        <div className="mb-8">
          <WebIntelligence />
        </div>

        <div className="bg-white rounded-2xl border-2 border-amber-200 shadow-lg mb-8">
          <div className="p-6 border-b border-amber-200 bg-gradient-to-r from-amber-50 to-white">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">Data Integrity Check</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-600 mb-1">GST Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹1.7 Cr</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-xs text-gray-600 mb-1">Bank Credits</p>
                <p className="text-2xl font-bold text-gray-900">₹1.6 Cr</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-xs text-gray-600 mb-1">Financial Statement</p>
                <p className="text-2xl font-bold text-gray-900">₹1.65 Cr</p>
              </div>
            </div>
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-emerald-900 mb-1">✓ Data Integrity Verified</p>
                  <p className="text-sm text-emerald-700">Revenue figures are consistent across all sources. Variance within acceptable range (±6%).</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg mb-8">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI Loan Simulator</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Loan Amount Simulation</label>
              <input
                type="range" min="1" max="10" step="0.5"
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>₹1 Cr</span><span>₹5 Cr</span><span>₹10 Cr</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-600 mb-1">Loan Amount</p>
                <p className="text-2xl font-bold text-gray-900">₹{loanAmount} Cr</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <p className="text-xs text-gray-600 mb-1">Risk Score</p>
                <p className="text-2xl font-bold text-gray-900">{riskScore}</p>
              </div>
              <div className={`p-4 bg-gradient-to-br rounded-lg border ${approval.color === 'emerald' ? 'from-emerald-50 to-emerald-100 border-emerald-200' : approval.color === 'amber' ? 'from-amber-50 to-amber-100 border-amber-200' : 'from-red-50 to-red-100 border-red-200'}`}>
                <p className="text-xs text-gray-600 mb-1">Status</p>
                <p className={`text-lg font-bold ${approval.color === 'emerald' ? 'text-emerald-700' : approval.color === 'amber' ? 'text-amber-700' : 'text-red-700'}`}>{approval.status}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
                <p className="text-xs text-gray-600 mb-1">Interest Rate</p>
                <p className="text-2xl font-bold text-gray-900">{interestRate}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-white">
              <h3 className="text-lg font-semibold text-gray-900">Industry Benchmark Comparison</h3>
              <p className="text-sm text-gray-600">Company vs Industry Average</p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={industryBenchmark}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="metric" stroke="#64748b" fontSize={11} angle={-15} textAnchor="end" height={80} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                  <Bar dataKey="company" fill="#10b981" radius={[8, 8, 0, 0]} name="Company" />
                  <Bar dataKey="industry" fill="#94a3b8" radius={[8, 8, 0, 0]} name="Industry Avg" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
                <p className="text-sm text-emerald-900"><strong>Insight:</strong> Company performance is above industry average.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-[24px] border border-white/40 shadow-2xl hover:shadow-xl transition-all overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/50 to-white/50">
              <h3 className="text-[14px] font-bold text-[#1E293B] uppercase tracking-widest flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Credit Strength Profile
              </h3>
            </div>
            <div className="flex-1 p-6">
              <div className="h-[400px]">
                <FiveCsRadarChart
                  scores={{
                    character: 85,
                    capacity: 82,
                    capital: 78,
                    collateral: 75,
                    conditions: 88
                  }}
                  title="5Cs Credit Matrix"
                />
              </div>
              <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Matrix Interpretation</p>
                <p className="text-[11px] font-medium text-slate-600">Company shows high "Conditions" scoring due to favorable sector tailwinds, while "Collateral" remains the primary area for monitoring.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 font-bold">Revenue & Profit Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="quarter" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} name="Revenue (₹ Cr)" />
              <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} name="Profit (₹ Cr)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 mb-8 pb-12">
          <CAMPreviewPanel applicationId={applicationId || "APP003"} companyName="Aether Dynamics Pvt Ltd" />
        </div>

        <div className="mt-8">
          <CreditOfficerInsights />
        </div>
      </div>
    </div>
  );
}
