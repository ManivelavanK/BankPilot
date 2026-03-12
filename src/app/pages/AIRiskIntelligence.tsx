import { Brain, TrendingDown, Scale, Activity, BarChart3, AlertTriangle, CheckCircle, Shield, XCircle, FileText, Building2, DollarSign } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

const riskCategories = [
  { 
    name: "Financial Risk", 
    score: 82, 
    status: "Good",
    icon: TrendingDown,
    color: "emerald",
    gradient: "from-emerald-500 to-emerald-600",
    bgGradient: "from-emerald-50 to-emerald-100",
    details: "Strong cash flow, healthy ratios"
  },
  { 
    name: "Legal Risk", 
    score: 64, 
    status: "Moderate",
    icon: Scale,
    color: "amber",
    gradient: "from-amber-500 to-amber-600",
    bgGradient: "from-amber-50 to-amber-100",
    details: "Minor litigation pending"
  },
  { 
    name: "Operational Risk", 
    score: 70, 
    status: "Good",
    icon: Activity,
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
    details: "Efficient operations, low disruption"
  },
  { 
    name: "Fraud Signals", 
    score: 35, 
    status: "High Risk",
    icon: Shield,
    color: "red",
    gradient: "from-red-500 to-red-600",
    bgGradient: "from-red-50 to-red-100",
    details: "Data mismatches detected"
  }
];

const radarData = [
  { category: 'Financial', score: 82, fullMark: 100 },
  { category: 'Legal', score: 64, fullMark: 100 },
  { category: 'Operational', score: 70, fullMark: 100 },
  { category: 'Fraud', score: 35, fullMark: 100 },
];

const dataComparison = [
  { source: "GST Revenue", amount: 1.7, icon: FileText, color: "blue" },
  { source: "Bank Statement Credits", amount: 1.1, icon: Building2, color: "purple" },
  { source: "Financial Statement Revenue", amount: 1.65, icon: DollarSign, color: "emerald" },
];

const fraudIndicators = [
  { indicator: "Round Number Transactions", status: "detected", risk: "medium", count: 12 },
  { indicator: "Duplicate Invoice Numbers", status: "clear", risk: "low", count: 0 },
  { indicator: "Unusual Transaction Timing", status: "detected", risk: "medium", count: 8 },
  { indicator: "Missing Sequential Numbers", status: "detected", risk: "high", count: 5 },
];

const riskFactors = [
  { factor: "Debt Service Coverage Ratio", value: "2.1x", status: "excellent", icon: CheckCircle },
  { factor: "Current Ratio", value: "1.8", status: "good", icon: CheckCircle },
  { factor: "Pending Litigation Cases", value: "2", status: "moderate", icon: AlertTriangle },
  { factor: "Industry Growth Rate", value: "18%", status: "excellent", icon: CheckCircle },
  { factor: "Management Experience", value: "15+ years", status: "excellent", icon: CheckCircle },
  { factor: "Market Volatility", value: "Medium", status: "moderate", icon: AlertTriangle },
];

export function AIRiskIntelligence() {
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    if (status === 'excellent') return 'bg-emerald-100 text-emerald-700';
    if (status === 'good') return 'bg-blue-100 text-blue-700';
    if (status === 'moderate') return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };

  const overallRiskScore = Math.round(riskCategories.reduce((acc, cat) => acc + cat.score, 0) / riskCategories.length);
  const maxAmount = Math.max(...dataComparison.map(d => d.amount));
  const minAmount = Math.min(...dataComparison.map(d => d.amount));
  const mismatchPercentage = Math.round(((maxAmount - minAmount) / maxAmount) * 100);

  return (
    <div className="p-6 md:p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Risk Intelligence Center</h1>
            <p className="text-gray-600">Comprehensive multi-dimensional risk assessment powered by AI</p>
          </div>
        </div>
      </div>

      {/* Overall Risk Score */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl shadow-lg p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">Overall Risk Assessment</h2>
            <p className="text-blue-100 text-sm">AI-powered comprehensive analysis</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{overallRiskScore}</div>
            <div className="text-sm text-blue-100">Total Risk Score</div>
          </div>
          <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <div className="text-sm text-blue-100">Risk Level</div>
            <div className="text-xl font-bold">Low Risk</div>
          </div>
        </div>
      </div>

      {/* Risk Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {riskCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.name}
              className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300 cursor-pointer group"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${category.bgGradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-7 h-7 text-${category.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(category.score)}`}>
                {category.score}
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">/ 100</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  category.score >= 75 ? 'bg-emerald-100 text-emerald-700' :
                  category.score >= 60 ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {category.status}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div 
                  className={`h-2 bg-gradient-to-r ${category.gradient} rounded-full transition-all duration-500`}
                  style={{ width: `${category.score}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">{category.details}</p>
            </div>
          );
        })}
      </div>

      {/* Radar Chart and Risk Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Radar Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Risk Distribution Radar
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="category" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
              <Radar 
                name="Risk Score" 
                dataKey="score" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Factors */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Key Risk Factors
          </h3>
          <div className="space-y-3">
            {riskFactors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Icon className={`w-5 h-5 ${
                      factor.status === 'excellent' ? 'text-emerald-600' :
                      factor.status === 'good' ? 'text-blue-600' :
                      'text-amber-600'
                    }`} />
                    <span className="text-sm font-medium text-gray-900">{factor.factor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-900">{factor.value}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(factor.status)}`}>
                      {factor.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          AI-Generated Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
            <h4 className="font-semibold text-emerald-900 mb-2">Strengths</h4>
            <ul className="space-y-1 text-sm text-emerald-800">
              <li>• Excellent financial health with strong DSCR of 2.1x</li>
              <li>• Consistent revenue growth of 18% YoY</li>
              <li>• Experienced management team with proven track record</li>
            </ul>
          </div>
          <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
            <h4 className="font-semibold text-amber-900 mb-2">Areas of Concern</h4>
            <ul className="space-y-1 text-sm text-amber-800">
              <li>• Two pending litigation cases requiring monitoring</li>
              <li>• Medium market volatility in the sector</li>
              <li>• Legal risk score below optimal threshold</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Fraud Detection Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-red-600" />
          Fraud Detection Analysis
        </h2>
        
        {/* Fraud Alert */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-red-900 mb-2">Data Mismatch Detected</h3>
              <p className="text-red-800 mb-3">
                Significant revenue variance identified across multiple data sources. Verification recommended.
              </p>
              <div className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold text-sm inline-block">
                Mismatch: {mismatchPercentage}%
              </div>
            </div>
          </div>
        </div>

        {/* Data Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {dataComparison.map((data, index) => {
            const Icon = data.icon;
            const isLowest = data.amount === minAmount;
            const isHighest = data.amount === maxAmount;
            
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300 ${
                  isLowest ? 'ring-2 ring-red-500' : isHighest ? 'ring-2 ring-emerald-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${data.color}-100 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${data.color}-600`} />
                  </div>
                  {isLowest && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                      Lowest
                    </span>
                  )}
                  {isHighest && (
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                      Highest
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">{data.source}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">₹{data.amount} Cr</div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-2 bg-gradient-to-r from-${data.color}-400 to-${data.color}-600 rounded-full`}
                    style={{ width: `${(data.amount / maxAmount) * 100}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fraud Indicators */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            Fraud Indicators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fraudIndicators.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  {item.status === 'detected' ? (
                    <AlertTriangle className={`w-5 h-5 ${
                      item.risk === 'high' ? 'text-red-600' : 'text-amber-600'
                    }`} />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  )}
                  <span className="text-sm font-medium text-gray-900">{item.indicator}</span>
                </div>
                <div className="flex items-center gap-3">
                  {item.status === 'detected' && (
                    <span className="text-sm font-bold text-gray-900">{item.count}</span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'detected'
                      ? item.risk === 'high'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
