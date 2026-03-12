import { Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
}

const events: TimelineEvent[] = [
  {
    date: 'Mar 2026',
    title: 'Major Contract Win',
    description: 'Secured ₹15 Cr government contract for digital transformation',
    type: 'positive'
  },
  {
    date: 'Feb 2026',
    title: 'Revenue Growth',
    description: 'Q4 revenue increased by 22% YoY',
    type: 'positive'
  },
  {
    date: 'Jan 2026',
    title: 'Compliance Check',
    description: 'GST filings up to date, no irregularities found',
    type: 'neutral'
  },
  {
    date: 'Dec 2025',
    title: 'Minor Litigation',
    description: 'Vendor dispute case filed, low materiality',
    type: 'negative'
  }
];

export function CompanyTimeline() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'positive': return CheckCircle;
      case 'negative': return AlertTriangle;
      default: return Calendar;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'positive': return 'bg-emerald-500 border-emerald-200';
      case 'negative': return 'bg-red-500 border-red-200';
      default: return 'bg-blue-500 border-blue-200';
    }
  };

  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-emerald-200 to-transparent" />
      
      <div className="space-y-6">
        {events.map((event, index) => {
          const Icon = getIcon(event.type);
          
          return (
            <div
              key={index}
              className="relative pl-16 group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute left-0 w-12 h-12 rounded-full ${getColor(event.type)} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:translate-x-2 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{event.date}</span>
                  <TrendingUp className={`w-4 h-4 ${event.type === 'positive' ? 'text-emerald-500' : event.type === 'negative' ? 'text-red-500' : 'text-blue-500'}`} />
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">{event.title}</h4>
                <p className="text-sm text-slate-600">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
