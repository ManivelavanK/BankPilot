import { PieChart, TrendingUp, AlertTriangle, Building2, DollarSign } from "lucide-react";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const riskDistribution = [
  { name: 'Low Risk', value: 45, color: '#10b981' },
  { name: 'Medium Risk', value: 35, color: '#f59e0b' },
  { name: 'High Risk', value: 20, color: '#ef4444' },
];

const companies = [
  { name: "TechVentures Pvt Ltd", sector: "IT Services", exposure: "₹5.2 Cr", riskScore: 82, riskLevel: "Low" },
  { name: "Global Manufacturing Co", sector: "Manufacturing", exposure: "₹12.5 Cr", riskScore: 68, riskLevel: "Medium" },
  { name: "Sunrise Textiles Ltd", sector: "Textiles", exposure: "₹8.0 Cr", riskScore: 45, riskLevel: "High" },
  { name: "Prime Logistics Pvt Ltd", sector: "Logistics", exposure: "₹3.8 Cr", riskScore: 78, riskLevel: "Low" },
  { name: "Urban Infrastructure Ltd", sector: "Construction", exposure: "₹25.0 Cr", riskScore: 62, riskLevel: "Medium" },
  { name: "Metro Retail Chain", sector: "Retail", exposure: "₹6.5 Cr", riskScore: 58, riskLevel: "Medium" },
  { name: "FastShip Couriers", sector: "Logistics", exposure: "₹4.2 Cr", riskScore: 72, riskLevel: "Low" },
  { name: "Green Energy Solutions", sector: "Energy", exposure: "₹15.0 Cr", riskScore: 48, riskLevel: "High" },
  { name: "Digital Marketing Hub", sector: "IT Services", exposure: "₹2.8 Cr", riskScore: 85, riskLevel: "Low" },
  { name: "Pharma Innovations Ltd", sector: "Healthcare", exposure: "₹9.5 Cr", riskScore: 65, riskLevel: "Medium" },
];

const portfolioStats = [
  { label: "Total Portfolio Value", value: "₹92.5 Cr", icon: DollarSign, color: "blue" },
  { label: "Number of Companies", value: "10", icon: Building2, color: "purple" },
  { label: "Average Risk Score", value: "66", icon: TrendingUp, color: "emerald" },
  { label: "High Risk Exposure", value: "₹23 Cr", icon: AlertTriangle, color: "red" },
];

export function PortfolioRiskMonitor() {
  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-emerald-100 text-emerald-700';
      case 'Medium': return 'bg-amber-100 text-amber-700';
      case 'High': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 md:p-8 bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-xl flex items-center justify-center shadow-lg">
            <PieChart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-[28px] font-bold text-[#1E293B]">Portfolio Risk Monitor</h1>
            <p className="text-sm text-[#64748B]">Real-time portfolio risk analysis and monitoring</p>
          </div>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {portfolioStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-sm text-[#64748B] mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-[#1E293B]">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Risk Distribution Chart and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Donut Chart */}
        <div className="lg:col-span-2 bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6">
          <h3 className="text-[20px] font-semibold text-[#1E293B] mb-6">Portfolio Risk Distribution</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPie>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="font-semibold text-[#1E293B]">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#1E293B]">{item.value}%</div>
                    <div className="text-xs text-[#64748B]">of portfolio</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Summary */}
        <div className="bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6">
          <h3 className="text-[20px] font-semibold text-[#1E293B] mb-6">Risk Summary</h3>
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
              <div className="text-sm text-emerald-600 font-semibold mb-1">Low Risk</div>
              <div className="text-2xl font-bold text-emerald-900">45%</div>
              <div className="text-xs text-emerald-700 mt-1">4 companies</div>
            </div>
            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
              <div className="text-sm text-amber-600 font-semibold mb-1">Medium Risk</div>
              <div className="text-2xl font-bold text-amber-900">35%</div>
              <div className="text-xs text-amber-700 mt-1">4 companies</div>
            </div>
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <div className="text-sm text-red-600 font-semibold mb-1">High Risk</div>
              <div className="text-2xl font-bold text-red-900">20%</div>
              <div className="text-xs text-red-700 mt-1">2 companies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6">
        <h3 className="text-[20px] font-semibold text-[#1E293B] mb-6">Company Risk Scores</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Exposure</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {companies.map((company, index) => (
                <tr key={index} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="font-semibold text-[#1E293B]">{company.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#64748B]">{company.sector}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#1E293B]">{company.exposure}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl font-bold ${getRiskScoreColor(company.riskScore)}`}>
                        {company.riskScore}
                      </span>
                      <div className="w-20 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${
                            company.riskScore >= 75 ? 'bg-emerald-500' :
                            company.riskScore >= 60 ? 'bg-amber-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${company.riskScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getRiskBadgeColor(company.riskLevel)}`}>
                      {company.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-[#2563EB] hover:text-[#1e40af] font-semibold text-sm">
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">Portfolio Alert</h4>
            <p className="text-sm text-amber-800">
              2 companies in high-risk category require immediate attention. Total exposure: ₹23 Cr (25% of portfolio).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
