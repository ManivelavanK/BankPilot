import { Building2, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Award, Users, Calendar, Menu } from "lucide-react";
import { useOutletContext } from "react-router";

const timeline = [
  { year: 2021, event: "Revenue Growth +12%", type: "positive", icon: TrendingUp },
  { year: 2022, event: "New Manufacturing Plant", type: "positive", icon: Building2 },
  { year: 2023, event: "Supplier Litigation", type: "negative", icon: AlertTriangle },
  { year: 2024, event: "Revenue Decline", type: "negative", icon: TrendingDown },
];

const benchmarks = [
  { metric: "Profit Margin", company: 36, industry: 22, unit: "%" },
  { metric: "Revenue Growth", company: 18, industry: 12, unit: "%" },
  { metric: "Debt-to-Equity", company: 0.8, industry: 1.2, unit: "x" },
  { metric: "Current Ratio", company: 1.8, industry: 1.4, unit: "" },
  { metric: "ROE", company: 31, industry: 18, unit: "%" },
  { metric: "Asset Turnover", company: 2.1, industry: 1.6, unit: "x" },
];

const managementMetrics = [
  { label: "Track Record", score: 92 },
  { label: "Transparency", score: 85 },
  { label: "Governance", score: 87 },
  { label: "Experience", score: 90 },
];

export function CompanyIntelligence() {
  const { setSidebarOpen } = useOutletContext<{ setSidebarOpen: (open: boolean) => void }>();
  const trustScore = 88;

  return (
    <div className="bg-gray-100 min-h-screen pb-8">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-gray-100/80 backdrop-blur-md -mx-4 px-4 py-4 sm:-mx-8 sm:px-8 sm:py-6 mb-6 sm:mb-8 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 hover:bg-white rounded-lg transition-colors border border-slate-200"
                aria-label="Toggle Sidebar"
              >
                <Menu className="w-5 h-5 text-slate-600" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Company Intelligence</h1>
            </div>
            <p className="text-gray-600">Comprehensive company analysis and industry benchmarking</p>
          </div>
        </div>
      </div>

      {/* Company Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">TechVentures Pvt Ltd</h2>
            <p className="text-gray-600">IT Services & Consulting • Pune, Maharashtra</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Annual Revenue</div>
            <div className="text-3xl font-bold text-gray-900">₹62 Cr</div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Company Timeline */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Company Timeline
          </h3>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-gray-200"></div>
            <div className="space-y-6">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative pl-20 group">
                    <div className={`absolute left-0 w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                      item.type === 'positive' 
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' 
                        : 'bg-gradient-to-br from-red-500 to-red-600'
                    }`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className={`p-4 rounded-xl border-l-4 transition-all hover:shadow-md ${
                      item.type === 'positive'
                        ? 'bg-emerald-50 border-emerald-500'
                        : 'bg-red-50 border-red-500'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-gray-900">{item.year}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.type === 'positive'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}>
                          {item.type === 'positive' ? 'Positive' : 'Negative'}
                        </span>
                      </div>
                      <p className={`text-lg font-semibold ${
                        item.type === 'positive' ? 'text-emerald-900' : 'text-red-900'
                      }`}>
                        {item.event}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Management Trust Score */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            Management Trust Score
          </h3>
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-40 h-40 mb-4">
              <svg className="transform -rotate-90 w-40 h-40">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#trustGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - trustScore / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">{trustScore}</span>
                <span className="text-sm text-gray-500">/ 100</span>
              </div>
            </div>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              High Trust
            </span>
          </div>
          <div className="space-y-3">
            {managementMetrics.map((metric, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                  <span className="text-sm font-bold text-gray-900">{metric.score}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${metric.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industry Benchmark Comparison */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          Industry Benchmark Comparison
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benchmarks.map((benchmark, index) => {
            const isOutperforming = benchmark.metric === "Debt-to-Equity" 
              ? benchmark.company < benchmark.industry 
              : benchmark.company > benchmark.industry;
            
            return (
              <div
                key={index}
                className="p-5 bg-gray-50 rounded-xl hover:shadow-md transition-all border-2 border-transparent hover:border-blue-200"
              >
                <h4 className="text-sm font-semibold text-gray-600 mb-4">{benchmark.metric}</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600">Company</span>
                      <span className={`text-2xl font-bold ${
                        isOutperforming ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {benchmark.company}{benchmark.unit}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${
                          isOutperforming 
                            ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' 
                            : 'bg-gradient-to-r from-red-400 to-red-600'
                        }`}
                        style={{ width: `${Math.min((benchmark.company / Math.max(benchmark.company, benchmark.industry)) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600">Industry Avg</span>
                      <span className="text-lg font-semibold text-gray-700">
                        {benchmark.industry}{benchmark.unit}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"
                        style={{ width: `${Math.min((benchmark.industry / Math.max(benchmark.company, benchmark.industry)) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-center">
                  {isOutperforming ? (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Outperforming
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Below Average
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-5">
          <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Strengths
          </h4>
          <ul className="space-y-2 text-sm text-emerald-800">
            <li>• Profit margin 64% above industry average</li>
            <li>• Strong revenue growth trajectory</li>
            <li>• Excellent management trust score (88/100)</li>
            <li>• Lower debt levels than industry peers</li>
          </ul>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-5">
          <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Watch Points
          </h4>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>• Recent revenue decline in 2024</li>
            <li>• Ongoing supplier litigation from 2023</li>
            <li>• Market volatility in IT services sector</li>
            <li>• Need to monitor legal proceedings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
