import { Link, useParams } from "react-router";
import { Shield, TrendingUp, DollarSign, Building2, BarChart3, ArrowRight } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

export function CreditScoring() {
  const { applicationId } = useParams();

  const fiveCsData = [
    { category: 'Character', score: 85, max: 100 },
    { category: 'Capacity', score: 82, max: 100 },
    { category: 'Capital', score: 78, max: 100 },
    { category: 'Collateral', score: 75, max: 100 },
    { category: 'Conditions', score: 88, max: 100 },
  ];

  const creditDetails = [
    {
      title: "Character",
      score: 85,
      icon: Shield,
      color: "blue",
      metrics: [
        { label: "Credit History", value: "Excellent", status: "good" },
        { label: "Payment Track Record", value: "100% on-time", status: "good" },
        { label: "Management Integrity", value: "Strong", status: "good" },
        { label: "Business Reputation", value: "Good standing", status: "good" }
      ],
      analysis: "Strong character assessment. Clean credit history with no defaults. Management has excellent reputation in the industry."
    },
    {
      title: "Capacity",
      score: 82,
      icon: TrendingUp,
      color: "green",
      metrics: [
        { label: "Debt Service Coverage Ratio", value: "2.1x", status: "good" },
        { label: "Current Ratio", value: "1.8", status: "good" },
        { label: "Revenue Growth", value: "+18% YoY", status: "good" },
        { label: "Operating Margin", value: "22%", status: "good" }
      ],
      analysis: "Company demonstrates strong capacity to repay. Healthy cash flows and debt servicing ability. Consistent revenue growth trajectory."
    },
    {
      title: "Capital",
      score: 78,
      icon: DollarSign,
      color: "purple",
      metrics: [
        { label: "Equity Base", value: "₹45 Cr", status: "good" },
        { label: "Debt-to-Equity", value: "0.8", status: "good" },
        { label: "Retained Earnings", value: "₹18 Cr", status: "good" },
        { label: "Working Capital", value: "₹12 Cr", status: "moderate" }
      ],
      analysis: "Adequate capital structure with reasonable leverage. Strong equity base provides good cushion for debt obligations."
    },
    {
      title: "Collateral",
      score: 75,
      icon: Building2,
      color: "orange",
      metrics: [
        { label: "Property Value", value: "₹35 Cr", status: "good" },
        { label: "Loan-to-Value Ratio", value: "68%", status: "good" },
        { label: "Security Coverage", value: "1.4x", status: "good" },
        { label: "Asset Quality", value: "Grade A", status: "good" }
      ],
      analysis: "Good collateral coverage with quality commercial property. LTV ratio is within acceptable limits providing adequate security."
    },
    {
      title: "Conditions",
      score: 88,
      icon: BarChart3,
      color: "teal",
      metrics: [
        { label: "Industry Outlook", value: "Positive", status: "good" },
        { label: "Market Position", value: "Strong", status: "good" },
        { label: "Economic Environment", value: "Favorable", status: "good" },
        { label: "Regulatory Climate", value: "Stable", status: "good" }
      ],
      analysis: "Favorable market conditions. IT sector showing strong growth. Company well-positioned to capitalize on digital transformation wave."
    }
  ];

  const overallScore = Math.round(fiveCsData.reduce((sum, item) => sum + item.score, 0) / fiveCsData.length);

  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-500' };
    if (score >= 60) return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-500' };
    return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-500' };
  };

  const scoreColors = getScoreColor(overallScore);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <Link to="/app" className="hover:text-blue-600">Dashboard</Link>
          <span>/</span>
          <Link to={`/app/analysis/${applicationId}`} className="hover:text-blue-600">AI Analysis</Link>
          <span>/</span>
          <Link to={`/app/research/${applicationId}`} className="hover:text-blue-600">Research</Link>
          <span>/</span>
          <span className="text-gray-900">Credit Scoring</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Credit Risk Scoring</h1>
            <p className="text-gray-600">TechVentures Pvt Ltd • Five Cs of Credit Analysis</p>
          </div>
          <Link
            to={`/app/recommendation/${applicationId}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            View Recommendation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Overall Score Card */}
      <div className={`bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 ${scoreColors.border} mb-8`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Overall Credit Score</p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-6xl font-bold text-gray-900">{overallScore}</h2>
              <span className="text-2xl text-gray-500">/ 100</span>
            </div>
            <p className="text-lg font-medium text-green-700 mt-2">Strong Credit Profile</p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${scoreColors.bg} ${scoreColors.text}`}>
              Investment Grade
            </div>
            <p className="text-sm text-gray-600 mt-2">AI Confidence: 94%</p>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Five Cs Credit Assessment</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={fiveCsData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="category" tick={{ fill: '#6b7280', fontSize: 14 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
            <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
        <p className="text-center text-sm text-gray-600 mt-4">
          Comprehensive assessment across all five credit dimensions
        </p>
      </div>

      {/* Detailed Analysis Cards */}
      <div className="space-y-6">
        {creditDetails.map((detail, index) => {
          const Icon = detail.icon;
          const colors = getScoreColor(detail.score);
          
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-${detail.color}-50`}>
                      <Icon className={`w-6 h-6 text-${detail.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{detail.title}</h3>
                      <p className="text-sm text-gray-600">AI-powered assessment</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{detail.score}</div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                      Strong
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {detail.metrics.map((metric, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="text-xs text-gray-500">{metric.label}</p>
                      <p className="text-base font-semibold text-gray-900">{metric.value}</p>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${
                          metric.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className={`text-xs ${
                          metric.status === 'good' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {metric.status === 'good' ? 'Strong' : 'Moderate'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">AI Analysis: </span>
                    {detail.analysis}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Risk Rating</h4>
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">Low Risk</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Based on comprehensive analysis</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Probability of Default</h4>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">2.3%</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '5%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Industry average: 4.5%</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Recommended LTV</h4>
            <BarChart3 className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">75%</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Maximum recommended exposure</p>
        </div>
      </div>
    </div>
  );
}
