import { Settings, CheckCircle, XCircle, AlertTriangle, Shield } from "lucide-react";

const policyRules = [
  {
    rule: "Minimum Profit Margin",
    threshold: "10%",
    companyValue: "36%",
    status: "pass",
    category: "Financial"
  },
  {
    rule: "Maximum Debt-to-Equity Ratio",
    threshold: "1.5",
    companyValue: "0.8",
    status: "pass",
    category: "Financial"
  },
  {
    rule: "Minimum DSCR",
    threshold: "1.25",
    companyValue: "2.1",
    status: "pass",
    category: "Financial"
  },
  {
    rule: "Minimum Current Ratio",
    threshold: "1.0",
    companyValue: "1.8",
    status: "pass",
    category: "Liquidity"
  },
  {
    rule: "Maximum Loan-to-Value",
    threshold: "75%",
    companyValue: "68%",
    status: "pass",
    category: "Collateral"
  },
  {
    rule: "Minimum Years in Business",
    threshold: "3 years",
    companyValue: "8 years",
    status: "pass",
    category: "Business"
  },
  {
    rule: "Maximum Pending Litigation Value",
    threshold: "₹5 Cr",
    companyValue: "₹2.5 Cr",
    status: "warning",
    category: "Legal"
  },
  {
    rule: "GST Compliance",
    threshold: "100%",
    companyValue: "98%",
    status: "warning",
    category: "Compliance"
  },
  {
    rule: "Minimum Revenue Growth",
    threshold: "5%",
    companyValue: "18%",
    status: "pass",
    category: "Growth"
  },
  {
    rule: "Maximum Industry Concentration",
    threshold: "40%",
    companyValue: "28%",
    status: "pass",
    category: "Risk"
  }
];

const complianceSummary = {
  totalRules: policyRules.length,
  passed: policyRules.filter(r => r.status === 'pass').length,
  warnings: policyRules.filter(r => r.status === 'warning').length,
  failed: policyRules.filter(r => r.status === 'fail').length
};

export function CreditPolicyEngine() {
  const compliancePercentage = Math.round((complianceSummary.passed / complianceSummary.totalRules) * 100);

  return (
    <div className="p-6 md:p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Credit Policy Engine</h1>
            <p className="text-gray-600">Automated credit policy compliance verification</p>
          </div>
        </div>
      </div>

      {/* Compliance Summary */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl shadow-lg p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-1">Overall Compliance Status</h2>
            <p className="text-blue-100 text-sm">Company meets credit policy requirements</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-1">{compliancePercentage}%</div>
              <div className="text-sm text-blue-100">Compliance Rate</div>
            </div>
            <div className="h-16 w-px bg-white/30"></div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{complianceSummary.passed}/{complianceSummary.totalRules}</div>
              <div className="text-sm text-blue-100">Rules Passed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-sm text-gray-600 mb-1">Total Rules</div>
          <div className="text-3xl font-bold text-gray-900">{complianceSummary.totalRules}</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="text-sm text-gray-600 mb-1">Passed</div>
          <div className="text-3xl font-bold text-emerald-600">{complianceSummary.passed}</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="text-sm text-gray-600 mb-1">Warnings</div>
          <div className="text-3xl font-bold text-amber-600">{complianceSummary.warnings}</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-sm text-gray-600 mb-1">Failed</div>
          <div className="text-3xl font-bold text-red-600">{complianceSummary.failed}</div>
        </div>
      </div>

      {/* Policy Rules */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Credit Policy Rules</h2>
        <div className="space-y-4">
          {policyRules.map((rule, index) => {
            const isPassed = rule.status === 'pass';
            const isWarning = rule.status === 'warning';
            const isFailed = rule.status === 'fail';

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isPassed ? 'bg-emerald-100' : isWarning ? 'bg-amber-100' : 'bg-red-100'
                  }`}>
                    {isPassed && <CheckCircle className="w-7 h-7 text-emerald-600" />}
                    {isWarning && <AlertTriangle className="w-7 h-7 text-amber-600" />}
                    {isFailed && <XCircle className="w-7 h-7 text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{rule.rule}</h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {rule.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-gray-500">Threshold: </span>
                        <span className="font-semibold text-gray-700">{rule.threshold}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Company: </span>
                        <span className={`font-bold ${
                          isPassed ? 'text-emerald-600' : isWarning ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {rule.companyValue}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                    isPassed ? 'bg-emerald-100 text-emerald-700' :
                    isWarning ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {isPassed && <CheckCircle className="w-4 h-4" />}
                    {isWarning && <AlertTriangle className="w-4 h-4" />}
                    {isFailed && <XCircle className="w-4 h-4" />}
                    {isPassed ? 'PASS' : isWarning ? 'WARNING' : 'FAIL'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-5">
          <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Strengths
          </h4>
          <ul className="space-y-2 text-sm text-emerald-800">
            <li>• Excellent profit margin (36%) well above minimum requirement</li>
            <li>• Strong DSCR of 2.1x indicates robust debt servicing capacity</li>
            <li>• Healthy liquidity with current ratio of 1.8</li>
            <li>• Conservative debt levels with D/E ratio of 0.8</li>
          </ul>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-5">
          <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Action Items
          </h4>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>• Monitor pending litigation (₹2.5 Cr) for resolution</li>
            <li>• Address GST compliance gap to achieve 100% compliance</li>
            <li>• Maintain current financial performance levels</li>
            <li>• Continue monitoring debt levels and cash flow</li>
          </ul>
        </div>
      </div>

      {/* Final Decision */}
      <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Credit Policy: APPROVED</h3>
              <p className="text-gray-600">Company meets all critical credit policy requirements</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Compliance Score</div>
            <div className="text-4xl font-bold text-emerald-600">{compliancePercentage}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
