import { FileSearch, CheckCircle, AlertTriangle, FileText, TrendingUp, Scale, DollarSign, Users } from "lucide-react";

const insights = [
  {
    text: "Revenue increased by 18% year-on-year",
    type: "positive",
    source: "Financial Statement FY 2024-25",
    category: "Financial",
    icon: TrendingUp,
    confidence: 98
  },
  {
    text: "Company involved in supplier dispute",
    type: "risk",
    source: "Legal Documents",
    category: "Legal",
    icon: Scale,
    confidence: 95
  },
  {
    text: "Strong cash flow with DSCR of 2.1x",
    type: "positive",
    source: "Financial Statement",
    category: "Financial",
    icon: DollarSign,
    confidence: 99
  },
  {
    text: "Pending litigation worth ₹2.5 Cr",
    type: "risk",
    source: "Legal Records",
    category: "Legal",
    icon: AlertTriangle,
    confidence: 92
  },
  {
    text: "Secured major government contract worth ₹15 Cr",
    type: "positive",
    source: "Business Documents",
    category: "Business",
    icon: CheckCircle,
    confidence: 97
  },
  {
    text: "Declining profit margins in last quarter",
    type: "risk",
    source: "Quarterly Report Q4",
    category: "Financial",
    icon: TrendingUp,
    confidence: 88
  },
  {
    text: "Experienced management team with 15+ years",
    type: "positive",
    source: "Company Profile",
    category: "Management",
    icon: Users,
    confidence: 100
  },
  {
    text: "GST compliance irregularities detected",
    type: "risk",
    source: "GST Returns",
    category: "Compliance",
    icon: AlertTriangle,
    confidence: 85
  },
  {
    text: "Consistent revenue growth over 3 years",
    type: "positive",
    source: "Financial Statements",
    category: "Financial",
    icon: TrendingUp,
    confidence: 96
  },
  {
    text: "High employee turnover rate of 28%",
    type: "risk",
    source: "HR Documents",
    category: "Operational",
    icon: Users,
    confidence: 82
  }
];

const documents = [
  { name: "Financial Statement FY 2024-25", status: "Analyzed", insights: 8 },
  { name: "Bank Statements", status: "Analyzed", insights: 12 },
  { name: "GST Returns", status: "Analyzed", insights: 5 },
  { name: "Legal Documents", status: "Analyzed", insights: 3 },
  { name: "Company Profile", status: "Analyzed", insights: 6 },
];

export function DocumentIntelligence() {
  const positiveCount = insights.filter(i => i.type === 'positive').length;
  const riskCount = insights.filter(i => i.type === 'risk').length;

  return (
    <div className="p-6 md:p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileSearch className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Document Intelligence Explorer</h1>
            <p className="text-gray-600">AI-powered insights extraction from uploaded documents</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-sm text-gray-600 mb-1">Documents Analyzed</div>
          <div className="text-3xl font-bold text-gray-900">{documents.length}</div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <FileSearch className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-sm text-gray-600 mb-1">Total Insights</div>
          <div className="text-3xl font-bold text-gray-900">{insights.length}</div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="text-sm text-gray-600 mb-1">Positive Signals</div>
          <div className="text-3xl font-bold text-emerald-600">{positiveCount}</div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-sm text-gray-600 mb-1">Risk Signals</div>
          <div className="text-3xl font-bold text-red-600">{riskCount}</div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Extracted Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            const isPositive = insight.type === 'positive';
            
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-md p-6 border-l-4 hover:shadow-lg transition-all ${
                  isPositive ? 'border-emerald-500' : 'border-red-500'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isPositive ? 'bg-emerald-100' : 'bg-red-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${isPositive ? 'text-emerald-600' : 'text-red-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        isPositive 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {isPositive ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Positive
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Risk
                          </>
                        )}
                      </span>
                      <span className="text-xs text-gray-500">{insight.confidence}% confidence</span>
                    </div>
                    <p className={`text-lg font-semibold mb-3 ${
                      isPositive ? 'text-emerald-900' : 'text-red-900'
                    }`}>
                      "{insight.text}"
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{insight.source}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {insight.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Analyzed Documents</h3>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{doc.name}</div>
                  <div className="text-sm text-gray-500">{doc.insights} insights extracted</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                  {doc.status}
                </span>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-5">
          <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Positive Highlights
          </h4>
          <ul className="space-y-2 text-sm text-emerald-800">
            <li>• Strong financial performance with 18% revenue growth</li>
            <li>• Excellent debt service coverage ratio (2.1x)</li>
            <li>• Major contract wins strengthening revenue pipeline</li>
            <li>• Experienced management with proven track record</li>
          </ul>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-5">
          <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Risk Factors
          </h4>
          <ul className="space-y-2 text-sm text-red-800">
            <li>• Ongoing supplier dispute requiring monitoring</li>
            <li>• Pending litigation worth ₹2.5 Cr</li>
            <li>• GST compliance irregularities detected</li>
            <li>• High employee turnover indicating operational issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
