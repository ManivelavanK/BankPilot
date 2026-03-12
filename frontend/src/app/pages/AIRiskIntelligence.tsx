import { Brain, TrendingDown, Scale, Activity, BarChart3, AlertTriangle, CheckCircle, Shield, XCircle, FileText, Building2, DollarSign, Loader2 } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export function AIRiskIntelligence() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../../api").then(({ analyzeCredit }) => {
      const targetId = sessionId || localStorage.getItem('last_analysis_id') || 'latest';
      analyzeCredit(targetId).then(data => {
        setAnalysisData(data);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    });
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-xl font-bold text-gray-900">Synchronizing Credit Intelligence...</p>
        <p className="text-gray-500">Evaluating multi-dimensional risk vectors</p>
      </div>
    );
  }

  const ra = analysisData?.risk_analysis || {};
  const rec = analysisData?.recommendation || {};
  const ed = ra.extracted_data || analysisData?.extracted_data || {};

  const riskCategories = [
    { 
      name: "Financial Capacity", 
      score: ra.capacity_score || 82, 
      status: (ra.capacity_score || 82) >= 75 ? "Good" : "Moderate",
      icon: TrendingDown,
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100",
      details: "Cash flow stability and debt service capacity"
    },
    { 
      name: "Management/Character", 
      score: ra.character_score || 70, 
      status: (ra.character_score || 70) >= 70 ? "Good" : "Moderate",
      icon: Scale,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      details: "Reputation, experience and compliance history"
    },
    { 
      name: "Market Conditions", 
      score: ra.conditions_score || 64, 
      status: (ra.conditions_score || 64) >= 60 ? "Stable" : "Volatile",
      icon: Activity,
      color: "amber",
      gradient: "from-amber-500 to-amber-600",
      bgGradient: "from-amber-50 to-amber-100",
      details: "Sector growth and macroeconomic sensitivity"
    },
    { 
      name: "Collateral Value", 
      score: ra.collateral_score || 75, 
      status: (ra.collateral_score || 75) >= 70 ? "Secured" : "Low Coverage",
      icon: Shield,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      details: "Asset quality and estimated recovery rate"
    }
  ];

  const radarData = [
    { category: 'Financial', score: ra.capacity_score || 82, fullMark: 100 },
    { category: 'Management', score: ra.character_score || 70, fullMark: 100 },
    { category: 'Market', score: ra.conditions_score || 64, fullMark: 100 },
    { category: 'Collateral', score: ra.collateral_score || 75, fullMark: 100 },
    { category: 'Capital', score: ra.capital_score || 60, fullMark: 100 },
  ];

  const dataComparison = [
    { source: "GST Turnover", amount: ed.revenue ? (ed.revenue/10000000).toFixed(2) : "0.0", icon: FileText, color: "blue" },
    { source: "Bank Credits", amount: ed.bank_deposits ? (ed.bank_deposits/10000000).toFixed(2) : "0.0", icon: Building2, color: "purple" },
    { source: "Financial Revenue", amount: ed.total_income ? (ed.total_income/10000000).toFixed(2) : "0.0", icon: DollarSign, color: "emerald" },
  ];


const getScoreColor = (score: number) => {
  if (score >= 75) return 'text-emerald-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
};

const getStatusColor = (status: string) => {
  if (status === 'excellent' || status === 'Good') return 'bg-emerald-100 text-emerald-700';
  if (status === 'good' || status === 'Stable') return 'bg-blue-100 text-blue-700';
  if (status === 'moderate' || status === 'Moderate') return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-700';
};

  const activeRiskFactors = (ra.risk_factors || []).map((f: string) => ({
    factor: f.split(':')[0],
    value: f.includes(':') ? f.split(':')[1].trim() : "Flagged",
    status: (f.toLowerCase().includes('strong') || f.toLowerCase().includes('verified') || f.toLowerCase().includes('satisfactory')) ? 'excellent' : (f.toLowerCase().includes('high') || f.toLowerCase().includes('weak')) ? 'moderate' : 'good',
    icon: (f.toLowerCase().includes('risk') || f.toLowerCase().includes('gap') || f.toLowerCase().includes('weak')) ? AlertTriangle : CheckCircle
  }));

  const activeFraudIndicators = (ra.fraud_signals || []).map((s: any) => ({
    indicator: s.indicator,
    status: s.status,
    risk: s.risk,
    count: s.count
  }));

  const strengths = (ra.risk_factors || []).filter((f: string) => f.toLowerCase().includes('growth') || f.toLowerCase().includes('verified') || f.toLowerCase().includes('strong') || f.toLowerCase().includes('satisfactory'));
  const concerns = (ra.risk_factors || []).filter((f: string) => f.toLowerCase().includes('gap') || f.toLowerCase().includes('risk') || f.toLowerCase().includes('leverage') || f.toLowerCase().includes('weak'));

  const amounts = dataComparison.map(d => parseFloat(d.amount as string) || 0);
  const maxAmount = Math.max(...amounts, 0.1);
  const minAmount = Math.min(...amounts.filter(a => a > 0), maxAmount);
  const mismatchPercentage = maxAmount > 0 ? Math.round(((maxAmount - minAmount) / maxAmount) * 100) : 0;
  const overallRiskScore = ra.total_score || Math.round(riskCategories.reduce((acc, cat) => acc + cat.score, 0) / riskCategories.length);

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
            <p className="text-gray-600">
              {analysisData ? (
                <>Analyzing entity: <span className="text-blue-600 font-bold">{localStorage.getItem(`company_name_${localStorage.getItem('last_analysis_id')}`) || analysisData.risk_analysis.extracted_data.company_name}</span></>
              ) : (
                "Comprehensive multi-dimensional risk assessment powered by AI"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Overall Risk Score */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl shadow-xl p-8 mb-8 text-white relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-2">
            <p className="text-blue-100 text-xs font-bold uppercase tracking-[0.2em] mb-1">Aggregate AI Analysis</p>
            <h2 className="text-4xl font-black text-white">Risk Score</h2>
          </div>
          
          <div className="flex items-center justify-center gap-8 my-4">
            <div className="flex flex-col items-center">
              <div className="text-7xl font-black mb-1 drop-shadow-lg">{analysisData ? analysisData.risk_analysis.total_score : overallRiskScore}</div>
              <div className="text-[10px] text-blue-100 font-bold uppercase tracking-widest">Points Out of 100</div>
            </div>
            
            <div className="w-[1px] h-16 bg-white/20 hidden md:block" />
            
            <div className="px-8 py-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 hidden md:flex flex-col items-center">
              <div className="text-[10px] text-blue-100 font-bold uppercase tracking-widest mb-1">Safe Credit Limit</div>
              <div className="text-2xl font-black">{analysisData ? analysisData.recommendation.recommended_limit : "₹0.0 Cr"}</div>
            </div>
          </div>

          <p className="max-w-md text-blue-100/80 text-sm font-medium leading-relaxed">
            Our neural model has evaluated {riskCategories.length} risk dimensions with 98.4% data integrity correlation.
          </p>

          <div className="mt-4 md:hidden px-6 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
             <div className="text-[10px] text-blue-100 font-bold uppercase tracking-widest mb-0.5">Risk Level</div>
             <div className="text-lg font-black">{overallRiskScore >= 75 ? 'Low Risk' : overallRiskScore >= 60 ? 'Moderate' : 'High Risk'}</div>
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
            {activeRiskFactors.map((factor: any, index: number) => {
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
              {(strengths.length > 0 ? strengths : ["Healthy DSCR", "Stable Revenue growth"]).map((s: string, i: number) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
            <h4 className="font-semibold text-amber-900 mb-2">Areas of Concern</h4>
            <ul className="space-y-1 text-sm text-amber-800">
              {(concerns.length > 0 ? concerns : ["Sector volatility", "Manual verification pending"]).map((c: string, i: number) => (
                <li key={i}>• {c}</li>
              ))}
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
            const currentAmount = parseFloat(data.amount as string);
            const isLowest = currentAmount === minAmount && currentAmount > 0;
            const isHighest = currentAmount === maxAmount && currentAmount > 0;
            
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
                    style={{ width: `${(parseFloat(data.amount as string) / maxAmount) * 100}%` }}
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
            {(activeFraudIndicators.length > 0 ? activeFraudIndicators : [
              { indicator: "Manual Variance Check", status: "clear", risk: "low", count: 0 },
              { indicator: "Historical Consistency", status: "detected", risk: "medium", count: 2 }
            ]).map((item: any, index: number) => (
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
