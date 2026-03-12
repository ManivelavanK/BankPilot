import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface Alert {
  type: 'risk' | 'positive' | 'warning';
  title: string;
  message: string;
  time: string;
}

const alerts: Alert[] = [
  {
    type: 'risk',
    title: 'High Debt Ratio Detected',
    message: 'Current D/E ratio of 2.1x exceeds industry average',
    time: '2 hours ago'
  },
  {
    type: 'positive',
    title: 'Strong Cash Flow',
    message: 'Operating cash flow increased by 35% this quarter',
    time: '5 hours ago'
  },
  {
    type: 'warning',
    title: 'Pending GST Return',
    message: 'Q4 GST filing deadline approaching in 7 days',
    time: '1 day ago'
  }
];

export function AlertCards() {
  const getConfig = (type: string) => {
    switch (type) {
      case 'risk':
        return {
          icon: AlertTriangle,
          bg: 'bg-red-50 border-red-200',
          iconBg: 'bg-red-500',
          textColor: 'text-red-900',
          pulse: 'animate-pulse'
        };
      case 'positive':
        return {
          icon: CheckCircle,
          bg: 'bg-emerald-50 border-emerald-200',
          iconBg: 'bg-emerald-500',
          textColor: 'text-emerald-900',
          pulse: ''
        };
      default:
        return {
          icon: AlertCircle,
          bg: 'bg-amber-50 border-amber-200',
          iconBg: 'bg-amber-500',
          textColor: 'text-amber-900',
          pulse: ''
        };
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => {
        const config = getConfig(alert.type);
        const Icon = config.icon;
        
        return (
          <div
            key={index}
            className={`${config.bg} border rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-102 cursor-pointer animate-slide-in-left`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className={`${config.iconBg} ${config.pulse} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold ${config.textColor} mb-1`}>{alert.title}</h4>
                <p className="text-sm text-slate-700 mb-2">{alert.message}</p>
                <span className="text-xs text-slate-500">{alert.time}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
