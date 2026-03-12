import { TrendingUp, TrendingDown, BarChart3, DollarSign, Activity, Droplet, Menu } from 'lucide-react';
import { useOutletContext } from "react-router";

const benchmarks = [
  {
    metric: "Profit Margin",
    company: 36,
    industry: 22,
    unit: "%",
    icon: DollarSign,
    color: "emerald"
  },
  {
    metric: "Debt Ratio",
    company: 0.8,
    industry: 1.2,
    unit: "x",
    icon: BarChart3,
    color: "blue",
    lowerIsBetter: true
  },
  {
    metric: "Revenue Growth",
    company: 22,
    industry: 15,
    unit: "%",
    icon: TrendingUp,
    color: "purple"
  },
  {
    metric: "Liquidity Ratio",
    company: 1.8,
    industry: 1.5,
    unit: "x",
    icon: Droplet,
    color: "cyan"
  },
  {
    metric: "ROE",
    company: 18,
    industry: 12,
    unit: "%",
    icon: Activity,
    color: "indigo"
  },
  {
    metric: "Asset Turnover",
    company: 1.4,
    industry: 1.1,
    unit: "x",
    icon: TrendingUp,
    color: "teal"
  }
];

export function IndustryBenchmark() {
  const { setSidebarOpen } = useOutletContext<{ setSidebarOpen: (open: boolean) => void }>();
  const getStatus = (company: number, industry: number, lowerIsBetter = false) => {
    if (lowerIsBetter) {
      return company < industry ? "Above Industry Average" : "Below Industry Average";
    }
    return company > industry ? "Above Industry Average" : "Below Industry Average";
  };

  const isAboveAverage = (company: number, industry: number, lowerIsBetter = false) => {
    if (lowerIsBetter) {
      return company < industry;
    }
    return company > industry;
  };

  const getDifference = (company: number, industry: number) => {
    const diff = ((company - industry) / industry * 100).toFixed(1);
    return diff;
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-8">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#F8FAFC]/80 backdrop-blur-md -mx-4 px-4 py-4 sm:-mx-8 sm:px-8 sm:py-6 mb-6 sm:mb-8 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
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
              <h1 className="text-[28px] font-bold text-[#1E293B]">Industry Benchmark</h1>
            </div>
            <p className="text-sm text-[#64748B]">Compare company metrics with industry averages</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-semibold text-[#1E293B] mb-1">TechVentures Pvt Ltd</h2>
            <p className="text-sm text-[#64748B]">IT Services Sector</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#64748B]">Benchmark Date</div>
            <div className="text-[20px] font-semibold text-[#1E293B]">March 2026</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benchmarks.map((item, index) => {
          const Icon = item.icon;
          const above = isAboveAverage(item.company, item.industry, item.lowerIsBetter);
          const status = getStatus(item.company, item.industry, item.lowerIsBetter);
          const diff = getDifference(item.company, item.industry);

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
                {above ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
              </div>

              <h3 className="text-[20px] font-semibold text-[#1E293B] mb-4">{item.metric}</h3>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#64748B]">Company</span>
                  <span className="text-2xl font-bold text-[#1E293B]">
                    {item.company}{item.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#64748B]">Industry Avg</span>
                  <span className="text-lg font-semibold text-[#64748B]">
                    {item.industry}{item.unit}
                  </span>
                </div>
              </div>

              <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden mb-4">
                <div
                  className={`h-2 rounded-full ${
                    above ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                  style={{ width: `${Math.min((item.company / (item.industry * 2)) * 100, 100)}%` }}
                ></div>
              </div>

              <div className={`p-3 rounded-xl ${above ? 'bg-emerald-50' : 'bg-red-50'}`}>
                <div className={`text-xs font-semibold mb-1 ${above ? 'text-emerald-700' : 'text-red-700'}`}>
                  {status}
                </div>
                <div className={`text-sm font-bold ${above ? 'text-emerald-900' : 'text-red-900'}`}>
                  {diff > '0' ? '+' : ''}{diff}% vs Industry
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 text-white">
        <h3 className="text-[20px] font-semibold mb-4">Overall Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">5/6</div>
            <div className="text-sm text-white/80">Above Average</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">83%</div>
            <div className="text-sm text-white/80">Percentile Rank</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">Strong</div>
            <div className="text-sm text-white/80">Overall Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">Low</div>
            <div className="text-sm text-white/80">Competitive Risk</div>
          </div>
        </div>
      </div>
    </div>
  );
}
