import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  gradient: string;
  bgGradient: string;
  delay?: number;
}

export function StatsCard({ 
  label, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  gradient, 
  bgGradient,
  delay = 0 
}: StatsCardProps) {
  return (
    <div 
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-2 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 group cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${bgGradient} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className="w-6 h-6 text-transparent" />
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
          trend === 'up' ? 'bg-emerald-100 text-emerald-700' :
          trend === 'down' ? 'bg-red-100 text-red-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {change}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </div>
  );
}
