import { useState } from 'react';
import { TrendingUp, DollarSign, Percent } from 'lucide-react';

export function WhatIfSimulator() {
  const [revenue, setRevenue] = useState(62);
  const [debtRatio, setDebtRatio] = useState(0.8);
  const [profitMargin, setProfitMargin] = useState(22);

  const calculateRiskScore = () => {
    const revenueScore = Math.min((revenue / 100) * 40, 40);
    const debtScore = Math.max(30 - (debtRatio * 15), 0);
    const marginScore = Math.min((profitMargin / 30) * 30, 30);
    return Math.round(revenueScore + debtScore + marginScore);
  };

  const riskScore = calculateRiskScore();
  const getRiskLevel = () => {
    if (riskScore >= 75) return { text: 'Low Risk', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (riskScore >= 50) return { text: 'Medium Risk', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { text: 'High Risk', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const risk = getRiskLevel();

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
      <h3 className="text-xl font-bold text-slate-900 mb-6">What-If Scenario Simulator</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Annual Revenue (₹ Cr)
            </label>
            <span className="text-lg font-bold text-slate-900">{revenue}</span>
          </div>
          <input
            type="range"
            min="10"
            max="150"
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 transition-all duration-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Debt-to-Equity Ratio
            </label>
            <span className="text-lg font-bold text-slate-900">{debtRatio.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={debtRatio}
            onChange={(e) => setDebtRatio(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 transition-all duration-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Percent className="w-4 h-4 text-purple-600" />
              Profit Margin (%)
            </label>
            <span className="text-lg font-bold text-slate-900">{profitMargin}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            value={profitMargin}
            onChange={(e) => setProfitMargin(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600 transition-all duration-500"
          />
        </div>
      </div>

      <div className={`mt-6 p-6 ${risk.bg} rounded-xl border-2 ${risk.color.replace('text', 'border')} transition-all duration-500`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 mb-1">Simulated Risk Score</p>
            <p className={`text-3xl font-bold ${risk.color}`}>{riskScore}/100</p>
          </div>
          <div className={`px-4 py-2 ${risk.color} ${risk.bg} rounded-full font-semibold text-sm`}>
            {risk.text}
          </div>
        </div>
      </div>
    </div>
  );
}
