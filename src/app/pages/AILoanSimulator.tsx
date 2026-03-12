import { Calculator, TrendingUp, DollarSign, Percent, AlertCircle, CheckCircle, Zap } from "lucide-react";
import { useState } from "react";

export function AILoanSimulator() {
  const [loanAmount, setLoanAmount] = useState(3);
  const [interestRate, setInterestRate] = useState(10);
  const [revenueChange, setRevenueChange] = useState(5);

  // Calculate risk score (0-100, higher is better)
  const calculateRiskScore = () => {
    let score = 75;
    
    // Loan amount impact
    if (loanAmount > 4) score -= 10;
    else if (loanAmount < 2) score += 5;
    
    // Interest rate impact
    if (interestRate > 12) score -= 5;
    else if (interestRate < 9) score += 5;
    
    // Revenue change impact
    score += revenueChange * 0.5;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  // Calculate approval probability
  const calculateApprovalProbability = () => {
    const riskScore = calculateRiskScore();
    let probability = riskScore * 0.9;
    
    if (revenueChange < 0) probability -= 10;
    if (loanAmount > 4) probability -= 5;
    
    return Math.max(0, Math.min(100, Math.round(probability)));
  };

  // Calculate suggested interest rate
  const calculateSuggestedRate = () => {
    let rate = 9.5;
    
    if (loanAmount > 4) rate += 1;
    if (revenueChange < 0) rate += 1.5;
    else if (revenueChange > 10) rate -= 0.5;
    
    return rate.toFixed(1);
  };

  const riskScore = calculateRiskScore();
  const approvalProbability = calculateApprovalProbability();
  const suggestedRate = calculateSuggestedRate();

  const getRiskLevel = () => {
    if (riskScore >= 75) return { text: 'Low Risk', color: 'emerald', bg: 'bg-emerald-50', border: 'border-emerald-500' };
    if (riskScore >= 50) return { text: 'Medium Risk', color: 'amber', bg: 'bg-amber-50', border: 'border-amber-500' };
    return { text: 'High Risk', color: 'red', bg: 'bg-red-50', border: 'border-red-500' };
  };

  const getApprovalStatus = () => {
    if (approvalProbability >= 75) return { text: 'Highly Likely', color: 'emerald' };
    if (approvalProbability >= 50) return { text: 'Moderate', color: 'amber' };
    return { text: 'Low Chance', color: 'red' };
  };

  const risk = getRiskLevel();
  const approval = getApprovalStatus();

  return (
    <div className="p-6 md:p-8 bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-xl flex items-center justify-center shadow-lg">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-[28px] font-bold text-[#1E293B]">AI Loan Simulator</h1>
            <p className="text-sm text-[#64748B]">Interactive what-if analysis for loan scenarios</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Controls */}
        <div className="bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6">
          <h3 className="text-[20px] font-semibold text-[#1E293B] mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#2563EB]" />
            Simulation Parameters
          </h3>

          <div className="space-y-8">
            {/* Loan Amount Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#64748B]">
                  <DollarSign className="w-4 h-4 text-[#2563EB]" />
                  Loan Amount
                </label>
                <span className="text-2xl font-bold text-[#2563EB] transition-all duration-500">₹{loanAmount} Cr</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-3 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB] transition-all duration-500"
              />
              <div className="flex justify-between text-xs text-[#64748B] mt-1">
                <span>₹1 Cr</span>
                <span>₹5 Cr</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#64748B]">
                  <Percent className="w-4 h-4 text-[#2563EB]" />
                  Interest Rate
                </label>
                <span className="text-2xl font-bold text-[#2563EB] transition-all duration-500">{interestRate}%</span>
              </div>
              <input
                type="range"
                min="8"
                max="14"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-3 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB] transition-all duration-500"
              />
              <div className="flex justify-between text-xs text-[#64748B] mt-1">
                <span>8%</span>
                <span>14%</span>
              </div>
            </div>

            {/* Revenue Change Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#64748B]">
                  <TrendingUp className="w-4 h-4 text-[#10B981]" />
                  Revenue Change
                </label>
                <span className={`text-2xl font-bold transition-all duration-500 ${revenueChange >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                  {revenueChange > 0 ? '+' : ''}{revenueChange}%
                </span>
              </div>
              <input
                type="range"
                min="-10"
                max="20"
                step="1"
                value={revenueChange}
                onChange={(e) => setRevenueChange(Number(e.target.value))}
                className="w-full h-3 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#10B981] transition-all duration-500"
              />
              <div className="flex justify-between text-xs text-[#64748B] mt-1">
                <span>-10%</span>
                <span>+20%</span>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
            <p className="text-sm font-semibold text-[#64748B] mb-3">Quick Presets:</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => { setLoanAmount(2); setInterestRate(9); setRevenueChange(15); }}
                className="px-3 py-2 bg-[#D1FAE5] text-[#10B981] rounded-lg text-xs font-semibold hover:bg-[#A7F3D0] transition-all duration-500"
              >
                Conservative
              </button>
              <button
                onClick={() => { setLoanAmount(3); setInterestRate(10); setRevenueChange(5); }}
                className="px-3 py-2 bg-[#DBEAFE] text-[#2563EB] rounded-lg text-xs font-semibold hover:bg-[#BFDBFE] transition-all duration-500"
              >
                Balanced
              </button>
              <button
                onClick={() => { setLoanAmount(5); setInterestRate(12); setRevenueChange(-5); }}
                className="px-3 py-2 bg-[#FEF3C7] text-[#F59E0B] rounded-lg text-xs font-semibold hover:bg-[#FDE68A] transition-all duration-500"
              >
                Aggressive
              </button>
            </div>
          </div>
        </div>

        {/* Output Results */}
        <div className="space-y-6">
          {/* Risk Score */}
          <div className={`${risk.bg} border-2 ${risk.border} rounded-[14px] p-6 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.06)]`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[20px] font-semibold text-[#1E293B] flex items-center gap-2">
                <AlertCircle className={`w-5 h-5 text-${risk.color}-600`} />
                Risk Score
              </h3>
              <span className={`px-3 py-1 bg-${risk.color}-500 text-white rounded-full text-sm font-semibold`}>
                {risk.text}
              </span>
            </div>
            <div className="flex items-end gap-3 mb-4">
              <span className={`text-6xl font-bold text-${risk.color}-600 transition-all duration-500`}>
                {riskScore}
              </span>
              <span className="text-2xl text-[#64748B] mb-2">/ 100</span>
            </div>
            <div className="w-full h-4 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div 
                className={`h-4 bg-gradient-to-r from-${risk.color}-400 to-${risk.color}-600 rounded-full transition-all duration-500`}
                style={{ width: `${riskScore}%` }}
              ></div>
            </div>
          </div>

          {/* Approval Probability */}
          <div className="bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[20px] font-semibold text-[#1E293B] flex items-center gap-2">
                <CheckCircle className={`w-5 h-5 text-${approval.color}-600`} />
                Approval Probability
              </h3>
              <span className={`px-3 py-1 bg-${approval.color}-100 text-${approval.color}-700 rounded-full text-sm font-semibold`}>
                {approval.text}
              </span>
            </div>
            <div className="flex items-end gap-3 mb-4">
              <span className={`text-6xl font-bold text-${approval.color}-600 transition-all duration-500`}>
                {approvalProbability}%
              </span>
            </div>
            <div className="w-full h-4 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div 
                className={`h-4 bg-gradient-to-r from-${approval.color}-400 to-${approval.color}-600 rounded-full transition-all duration-500`}
                style={{ width: `${approvalProbability}%` }}
              ></div>
            </div>
          </div>

          {/* Suggested Interest Rate */}
          <div className="bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 text-white transition-all duration-500">
            <h3 className="text-[20px] font-semibold mb-4 flex items-center gap-2">
              <Percent className="w-5 h-5" />
              AI Suggested Interest Rate
            </h3>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-6xl font-bold transition-all duration-500">{suggestedRate}%</span>
              <span className="text-xl text-white/80 mb-2">p.a.</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-sm text-white/90">
                Based on current parameters, this rate optimizes approval probability while maintaining acceptable risk levels.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6">
        <h3 className="text-[20px] font-semibold text-[#1E293B] mb-4">AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#DBEAFE] rounded-lg transition-all duration-500 hover:shadow-md">
            <h4 className="font-semibold text-[#1E293B] mb-2">Loan Impact</h4>
            <p className="text-sm text-[#64748B]">
              {loanAmount > 4 
                ? "High loan amount increases risk. Consider reducing exposure."
                : "Loan amount within acceptable range for company size."}
            </p>
          </div>
          <div className="p-4 bg-[#DBEAFE] rounded-lg transition-all duration-500 hover:shadow-md">
            <h4 className="font-semibold text-[#1E293B] mb-2">Rate Analysis</h4>
            <p className="text-sm text-[#64748B]">
              {interestRate > 12
                ? "Higher rate may impact debt servicing capacity."
                : "Interest rate competitive and manageable."}
            </p>
          </div>
          <div className="p-4 bg-[#D1FAE5] rounded-lg transition-all duration-500 hover:shadow-md">
            <h4 className="font-semibold text-[#1E293B] mb-2">Revenue Outlook</h4>
            <p className="text-sm text-[#64748B]">
              {revenueChange < 0
                ? "Negative revenue trend increases credit risk significantly."
                : "Positive revenue growth supports loan repayment capacity."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
