import { Shield, AlertTriangle, CheckCircle, TrendingUp, FileText, Building2, DollarSign, XCircle } from "lucide-react";

const dataComparison = [
  { source: "GST Revenue", amount: 1.7, icon: FileText, color: "blue" },
  { source: "Bank Statement Credits", amount: 1.1, icon: Building2, color: "purple" },
  { source: "Financial Statement Revenue", amount: 1.65, icon: DollarSign, color: "emerald" },
];

const anomalies = [
  {
    title: "Potential Revenue Mismatch",
    severity: "high",
    percentage: 35,
    description: "Significant variance detected between GST revenue and bank credits",
    recommendation: "Verify source of discrepancy with company management"
  },
  {
    title: "Bank Statement Anomaly",
    severity: "high",
    percentage: 33,
    description: "Bank credits 33% lower than reported financial statement revenue",
    recommendation: "Request detailed bank statement reconciliation"
  },
  {
    title: "GST Filing Inconsistency",
    severity: "medium",
    percentage: 3,
    description: "Minor variance between GST revenue and financial statements",
    recommendation: "Acceptable variance within normal range"
  }
];

const fraudIndicators = [
  { indicator: "Round Number Transactions", status: "detected", risk: "medium", count: 12 },
  { indicator: "Duplicate Invoice Numbers", status: "clear", risk: "low", count: 0 },
  { indicator: "Unusual Transaction Timing", status: "detected", risk: "medium", count: 8 },
  { indicator: "Benford's Law Violation", status: "clear", risk: "low", count: 0 },
  { indicator: "Missing Sequential Numbers", status: "detected", risk: "high", count: 5 },
  { indicator: "Altered Document Signatures", status: "clear", risk: "low", count: 0 },
];

const verificationChecks = [
  { check: "GST Number Verification", status: "verified", confidence: 100 },
  { check: "PAN Card Validation", status: "verified", confidence: 100 },
  { check: "Bank Account Verification", status: "verified", confidence: 98 },
  { check: "Director KYC Check", status: "verified", confidence: 95 },
  { check: "Address Verification", status: "pending", confidence: 0 },
  { check: "Digital Signature Validation", status: "verified", confidence: 100 },
];

export function FraudDetectionLab() {
  const maxAmount = Math.max(...dataComparison.map(d => d.amount));
  const minAmount = Math.min(...dataComparison.map(d => d.amount));
  const mismatchPercentage = Math.round(((maxAmount - minAmount) / maxAmount) * 100);

  return (
    <div className="p-6 md:p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fraud Detection Lab</h1>
            <p className="text-gray-600">AI-powered anomaly detection and financial data verification</p>
          </div>
        </div>
      </div>

      {/* Critical Alert Banner */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6 animate-pulse">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-900 mb-2">Critical Anomaly Detected</h3>
            <p className="text-red-800 mb-3">
              Significant revenue mismatch identified across multiple data sources. Immediate verification required.
            </p>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold text-sm">
                Mismatch: {mismatchPercentage}%
              </div>
              <div className="text-sm text-red-700">
                Risk Level: <span className="font-bold">HIGH</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Comparison Cards */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Data Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>

      {/* Anomaly Alerts */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Detected Anomalies</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {anomalies.map((anomaly, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 border ${
                anomaly.severity === 'high' 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-amber-50 border-amber-200'
              } ${anomaly.severity === 'high' ? 'animate-pulse' : ''}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                  anomaly.severity === 'high' ? 'text-red-600' : 'text-amber-600'
                }`} />
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${
                    anomaly.severity === 'high' ? 'text-red-900' : 'text-amber-900'
                  }`}>
                    {anomaly.title}
                  </h3>
                  <div className={`text-2xl font-bold mb-2 ${
                    anomaly.severity === 'high' ? 'text-red-700' : 'text-amber-700'
                  }`}>
                    {anomaly.percentage}%
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  anomaly.severity === 'high' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-amber-600 text-white'
                }`}>
                  {anomaly.severity.toUpperCase()}
                </span>
              </div>
              <p className={`text-sm mb-3 ${
                anomaly.severity === 'high' ? 'text-red-800' : 'text-amber-800'
              }`}>
                {anomaly.description}
              </p>
              <div className={`text-xs font-medium ${
                anomaly.severity === 'high' ? 'text-red-700' : 'text-amber-700'
              }`}>
                ⚠ {anomaly.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fraud Indicators & Verification Checks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fraud Indicators */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            Fraud Indicators
          </h3>
          <div className="space-y-3">
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

        {/* Verification Checks */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            Verification Checks
          </h3>
          <div className="space-y-3">
            {verificationChecks.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{item.check}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'verified'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  {item.status === 'verified' && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-1.5 bg-emerald-500 rounded-full"
                          style={{ width: `${item.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{item.confidence}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Fraud Detection Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">3</div>
            <div className="text-sm text-gray-300">Anomalies Detected</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400">3</div>
            <div className="text-sm text-gray-300">Fraud Indicators</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400">5</div>
            <div className="text-sm text-gray-300">Checks Verified</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">HIGH</div>
            <div className="text-sm text-gray-300">Overall Risk</div>
          </div>
        </div>
      </div>
    </div>
  );
}
