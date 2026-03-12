import { Brain, FileSearch, Scale, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const steps = [
  { icon: FileSearch, text: 'Scanning financial statements...', delay: 0 },
  { icon: Scale, text: 'Checking legal records...', delay: 2000 },
  { icon: TrendingUp, text: 'Analyzing market trends...', delay: 4000 },
  { icon: Brain, text: 'Generating credit intelligence...', delay: 6000 },
];

export function AIEngineLoader() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timers = steps.map((step, index) =>
      setTimeout(() => setCurrentStep(index), step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-8 border border-blue-200 shadow-xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden animate-pulse shadow-lg">
            <img src="/bankpilot-logo.jpg" alt="BankPilot Logo" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl opacity-50 animate-ping" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">BankPilot AI Engine</h3>
          <p className="text-sm text-slate-600">Processing your application...</p>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${isActive ? 'bg-white shadow-md scale-105' : 'bg-white/50'
                }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isComplete ? 'bg-emerald-500' : isActive ? 'bg-blue-500 animate-pulse' : 'bg-slate-200'
                }`}>
                {isComplete ? (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500'
                }`}>
                {step.text}
              </span>
              {isActive && (
                <div className="ml-auto">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-emerald-600 transition-all duration-1000 ease-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
