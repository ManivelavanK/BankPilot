import { useState, useEffect } from 'react';
import { Brain, FileText, Scale, TrendingUp, Shield, Calculator, CheckCircle, Clock } from 'lucide-react';

const analysisSteps = [
  { id: 1, title: 'Reading financial statements', icon: FileText, duration: 2000 },
  { id: 2, title: 'Checking litigation records', icon: Scale, duration: 4000 },
  { id: 3, title: 'Evaluating revenue growth', icon: TrendingUp, duration: 6000 },
  { id: 4, title: 'Detecting fraud signals', icon: Shield, duration: 8000 },
  { id: 5, title: 'Calculating credit score', icon: Calculator, duration: 10000 },
];

export function AICreditAnalyst() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDecision, setShowDecision] = useState(false);

  useEffect(() => {
    const timers = analysisSteps.map((step, index) =>
      setTimeout(() => setCurrentStep(index + 1), step.duration)
    );

    const decisionTimer = setTimeout(() => setShowDecision(true), 11000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(decisionTimer);
    };
  }, []);

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="p-6 md:p-8 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[28px] font-bold text-[#1E293B]">AI Credit Analyst</h1>
              <p className="text-sm text-[#64748B]">Real-time AI-powered credit evaluation in progress</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[20px] font-semibold text-[#1E293B] mb-1">TechVentures Pvt Ltd</h2>
              <p className="text-sm text-[#64748B]">Loan Amount: ₹5.2 Cr • IT Services Sector</p>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white rounded-xl font-semibold text-sm">
              Analyzing...
            </div>
          </div>

          <div className="space-y-4">
            {analysisSteps.map((step) => {
              const Icon = step.icon;
              const status = getStepStatus(step.id);

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                    status === 'active'
                      ? 'bg-gradient-to-r from-[#2563EB]/10 to-[#06B6D4]/10 border-2 border-[#2563EB] scale-105'
                      : status === 'completed'
                      ? 'bg-[#D1FAE5] border-2 border-[#10B981]'
                      : 'bg-[#F8FAFC] border-2 border-[#E2E8F0]'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      status === 'active'
                        ? 'bg-gradient-to-br from-[#2563EB] to-[#06B6D4] animate-pulse'
                        : status === 'completed'
                        ? 'bg-[#10B981]'
                        : 'bg-[#E2E8F0]'
                    }`}
                  >
                    {status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : status === 'active' ? (
                      <Icon className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <Clock className="w-6 h-6 text-[#64748B]" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#64748B]">Step {step.id}</span>
                      {status === 'active' && (
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      )}
                    </div>
                    <h3 className="text-[20px] font-semibold text-[#1E293B]">{step.title}</h3>
                  </div>

                  {status === 'completed' && (
                    <div className="px-3 py-1 bg-[#10B981] text-white rounded-full text-xs font-semibold">
                      Complete
                    </div>
                  )}
                  {status === 'active' && (
                    <div className="px-3 py-1 bg-[#2563EB] text-white rounded-full text-xs font-semibold animate-pulse">
                      Processing
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div
              className="h-3 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] rounded-full transition-all duration-1000"
              style={{ width: `${(currentStep / analysisSteps.length) * 100}%` }}
            ></div>
          </div>
          <div className="mt-2 text-center text-sm text-[#64748B]">
            Progress: {currentStep}/{analysisSteps.length} steps completed
          </div>
        </div>

        {showDecision && (
          <div className="bg-gradient-to-r from-[#10B981] to-[#059669] rounded-2xl shadow-lg p-8 text-white animate-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-[28px] font-bold mb-1">Analysis Complete</h2>
                <p className="text-white/80">AI credit evaluation finished successfully</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-sm text-white/80 mb-2">Final Recommendation</div>
                <div className="text-4xl font-bold mb-2">APPROVE</div>
                <div className="text-sm text-white/90">Loan application meets all credit criteria</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-sm text-white/80 mb-2">AI Confidence Score</div>
                <div className="text-4xl font-bold mb-2">94%</div>
                <div className="text-sm text-white/90">High confidence in credit decision</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-[20px] font-semibold mb-4">Key Findings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Strong Financials</div>
                    <div className="text-sm text-white/80">DSCR: 2.1x, Profit Margin: 36%</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Clean Legal Record</div>
                    <div className="text-sm text-white/80">No major litigation issues</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Excellent Growth</div>
                    <div className="text-sm text-white/80">22% YoY revenue growth</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Low Fraud Risk</div>
                    <div className="text-sm text-white/80">All verification checks passed</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button className="flex-1 px-6 py-3 bg-white text-[#10B981] rounded-xl font-semibold hover:bg-white/90 transition-all">
                Generate CAM Report
              </button>
              <button className="flex-1 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all">
                View Detailed Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
