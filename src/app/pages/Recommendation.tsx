import { Link, useParams } from "react-router";
import { CheckCircle, XCircle, AlertCircle, TrendingUp, DollarSign, Percent, Calendar, ArrowRight, FileText } from "lucide-react";

export function Recommendation() {
  const { applicationId } = useParams();

  const recommendation = {
    decision: "Approve",
    confidence: 94,
    loanAmount: "5.20",
    suggestedAmount: "5.20",
    interestRate: "9.5",
    tenure: "60 months (5 years)",
    emi: "₹10.9 Lakhs/month"
  };

  const keyFactors = [
    { factor: "Strong financial performance", impact: "positive", weight: "High" },
    { factor: "Excellent payment track record", impact: "positive", weight: "High" },
    { factor: "Growing industry sector", impact: "positive", weight: "Medium" },
    { factor: "Adequate collateral coverage", impact: "positive", weight: "Medium" },
    { factor: "Minor ongoing litigation", impact: "neutral", weight: "Low" },
    { factor: "Management quality", impact: "positive", weight: "High" }
  ];

  const loanTerms = [
    { label: "Loan Type", value: "Term Loan" },
    { label: "Purpose", value: "Business Expansion" },
    { label: "Repayment", value: "Monthly EMI" },
    { label: "Moratorium Period", value: "6 months" },
    { label: "Prepayment", value: "Allowed (1% charge)" },
    { label: "Processing Fee", value: "1% of loan amount" }
  ];

  const riskMitigation = [
    "Quarterly financial reporting required",
    "Maintain minimum DSCR of 1.5x",
    "Insurance coverage on collateral property",
    "Personal guarantee from promoters",
    "Annual review and renewal process"
  ];

  const conditions = [
    "Submission of audited financial statements annually",
    "No additional debt without prior approval",
    "Maintain security coverage ratio above 1.2x",
    "Timely GST and tax compliance",
    "Update on any material litigation or regulatory issues"
  ];

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
          <Link to={`/app/scoring/${applicationId}`} className="hover:text-blue-600">Credit Scoring</Link>
          <span>/</span>
          <span className="text-gray-900">Recommendation</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Credit Recommendation</h1>
            <p className="text-gray-600">TechVentures Pvt Ltd • Final Credit Decision</p>
          </div>
          <Link
            to={`/app/cam/${applicationId}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            Generate CAM Report
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Decision Banner */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-500 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-gray-900">APPROVED</h2>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                AI Confidence: {recommendation.confidence}%
              </span>
            </div>
            <p className="text-lg text-gray-700">
              The AI credit assessment recommends approval of the loan application based on comprehensive analysis across all credit parameters.
            </p>
          </div>
        </div>
      </div>

      {/* Loan Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recommended Loan Terms</h3>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sanctioned Amount</p>
                <p className="text-2xl font-bold text-gray-900">₹{recommendation.suggestedAmount} Cr</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Percent className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Interest Rate (Annual)</p>
                <p className="text-2xl font-bold text-gray-900">{recommendation.interestRate}%</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Loan Tenure</p>
                <p className="text-2xl font-bold text-gray-900">{recommendation.tenure}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly EMI</p>
                <p className="text-2xl font-bold text-gray-900">{recommendation.emi}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Terms & Conditions</h3>
          <div className="space-y-4">
            {loanTerms.map((term, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-600">{term.label}</span>
                <span className="text-sm font-medium text-gray-900">{term.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Factors */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Decision Factors</h3>
        <p className="text-sm text-gray-600 mb-6">
          AI-identified factors influencing the credit decision
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyFactors.map((item, index) => {
            const Icon = item.impact === 'positive' ? CheckCircle : item.impact === 'negative' ? XCircle : AlertCircle;
            const colorClass = item.impact === 'positive' ? 'text-green-600 bg-green-50' : 
                              item.impact === 'negative' ? 'text-red-600 bg-red-50' : 
                              'text-gray-600 bg-gray-50';
            
            return (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Icon className={`w-5 h-5 mt-0.5 ${colorClass.split(' ')[0]}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.factor}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.weight === 'High' ? 'bg-blue-100 text-blue-700' : 
                      item.weight === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {item.weight} Weight
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Risk Mitigation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Mitigation Measures</h3>
          <div className="space-y-3">
            {riskMitigation.map((measure, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-blue-700">{index + 1}</span>
                </div>
                <p className="text-sm text-gray-700">{measure}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Conditions</h3>
          <div className="space-y-3">
            {conditions.map((condition, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{condition}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Explanation */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">AI Risk Assessment Summary</h4>
            <p className="text-sm text-gray-700 mb-4">
              Based on comprehensive analysis of financial documents, credit history, market conditions, and regulatory compliance, 
              the AI system has determined that TechVentures Pvt Ltd presents a <strong>low credit risk profile</strong>. 
              The company demonstrates strong financial performance with consistent revenue growth, healthy profit margins, 
              and excellent debt servicing capacity. The management team has proven experience and maintains a clean track record. 
              The IT services sector shows positive growth trends, and the company is well-positioned to benefit from industry tailwinds.
            </p>
            <p className="text-sm text-gray-700">
              The recommended loan amount of ₹5.20 Cr is fully supported by the company's financial capacity and collateral coverage. 
              The suggested interest rate of 9.5% reflects the low-risk profile while maintaining competitive positioning. 
              Regular monitoring and compliance with the specified conditions will ensure continued loan performance.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 mt-8">
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
          Save as Draft
        </button>
        <button className="px-6 py-3 border border-red-300 text-red-700 rounded-lg font-semibold hover:bg-red-50 transition-colors">
          Override Decision
        </button>
        <Link
          to={`/app/cam/${applicationId}`}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
        >
          Generate CAM Report
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
