import { Link, useOutletContext } from "react-router";
import {
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Building2,
  DollarSign,
  BarChart3,
  Search,
  Bell,
  User,
  Brain,
  Activity,
  Shield,
  Zap,
  Menu
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '../components/MotionUtils';
import { getDashboardSummary, getAnalysisHistory } from '../../api';
import EarlyWarningSignals from '../components/EarlyWarningSignals';

const defaultStats = [
  {
    label: "Total Applications",
    value: "0",
    change: "0%",
    trend: "neutral",
    icon: FileText,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100"
  },
  {
    label: "Approved Loans",
    value: "0",
    change: "0%",
    trend: "neutral",
    icon: CheckCircle,
    gradient: "from-emerald-500 to-emerald-600",
    bgGradient: "from-emerald-50 to-emerald-100"
  },
  {
    label: "High Risk Companies",
    value: "0",
    change: "0",
    trend: "neutral",
    icon: AlertTriangle,
    gradient: "from-red-500 to-red-600",
    bgGradient: "from-red-50 to-red-100"
  },
  {
    label: "Pending Reviews",
    value: "0",
    change: "0",
    trend: "neutral",
    icon: Clock,
    gradient: "from-amber-500 to-amber-600",
    bgGradient: "from-amber-50 to-amber-100"
  },
];


const revenueData = [
  { month: 'Oct', revenue: 125, target: 120 },
  { month: 'Nov', revenue: 138, target: 130 },
  { month: 'Dec', revenue: 152, target: 145 },
  { month: 'Jan', revenue: 168, target: 160 },
  { month: 'Feb', revenue: 175, target: 170 },
  { month: 'Mar', revenue: 142, target: 150 },
];

const aiSteps = [
  { text: 'Scanning financial statements...', icon: FileText, delay: 0 },
  { text: 'Checking legal records...', icon: Shield, delay: 2000 },
  { text: 'Analyzing financial ratios...', icon: Activity, delay: 4000 },
  { text: 'Generating credit intelligence...', icon: Brain, delay: 6000 },
];

export function Dashboard() {
  const { setSidebarOpen } = useOutletContext<{ setSidebarOpen: (open: boolean) => void }>();
  const [currentAIStep, setCurrentAIStep] = useState(0);
  const [creditScore, setCreditScore] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [summary, setSummary] = useState<any>(null);
  const [statsData, setStatsData] = useState(defaultStats);
  const [apps, setApps] = useState<any[]>([]);
  const [riskData, setRiskData] = useState<any[]>([
    { name: 'Low Risk', value: 0, color: '#10b981' },
    { name: 'Medium Risk', value: 0, color: '#f59e0b' },
    { name: 'High Risk', value: 0, color: '#ef4444' },
  ]);
  const [revenueTrend, setRevenueTrend] = useState<any[]>(revenueData);
  const [latestAnalysis, setLatestAnalysis] = useState<any>(null);
  const [docInsights, setDocInsights] = useState<any[]>([]);
  const [analysisHistory, setAnalysisHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [recentAlerts, setRecentAlerts] = useState<any[]>([]);

  const fetchDashboardData = () => {
    getDashboardSummary().then(data => {
      setSummary(data);
      // Deep-copy defaultStats to avoid mutating shared array reference
      const newStats = defaultStats.map(s => ({ ...s }));
      newStats[0].value = data.total_applications.toString();
      newStats[1].value = data.approved_count.toString();
      newStats[2].value = data.risk_distribution.find((d: any) => d.name === 'High Risk')?.value.toString() || "0";
      newStats[3].value = data.review_count.toString();
      setStatsData(newStats);

      setApps(data.recent_activity || []);
      if (data.revenue_trend && data.revenue_trend.length > 0) {
        setRevenueTrend(data.revenue_trend);
      }
      setLatestAnalysis(data.latest_analysis);
      setDocInsights(data.document_insights || []);
      if (data.latest_analysis?.score !== undefined) {
        setCreditScore(data.latest_analysis.score);
      }
      if (data.recent_alerts) {
        setRecentAlerts(data.recent_alerts);
      }

      // Calculate percentages for pie chart if total > 0
      if (data.total_applications > 0) {
        const dist = data.risk_distribution.map((d: any) => ({
          ...d,
          value: Math.round((d.value / data.total_applications) * 100)
        }));
        setRiskData(dist);
      }
    }).catch(console.error);

    // Load analysis history
    getAnalysisHistory()
      .then(data => setAnalysisHistory(data.history || []))
      .catch(console.error)
      .finally(() => setHistoryLoading(false));
  };

  useEffect(() => {
    // Initial load
    fetchDashboardData();

    // Auto-refresh every 30 seconds so newly processed documents appear without manual reload
    const pollInterval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(pollInterval);
  }, []);

  const sectorDist = apps.reduce((acc: any[], app: any) => {
    const existing = acc.find(item => item.sector === app.sector);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ sector: app.sector || 'General', count: 1 });
    }
    return acc;
  }, []).map((item, _, arr) => ({
    ...item,
    exposure: Math.round((item.count / arr.reduce((sum, i) => sum + i.count, 0)) * 100),
    risk: 'Low', // Simplified for dashboard
    color: item.sector === 'Manufacturing' ? 'amber' : 'emerald'
  })).sort((a, b) => b.exposure - a.exposure);

  useEffect(() => {
    const timers = aiSteps.map((step, index) =>
      setTimeout(() => setCurrentAIStep(index), step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'under review':
        return 'bg-blue-100 text-blue-700';
      case 'ai analysis complete':
        return 'bg-purple-100 text-purple-700';
      case 'documents uploaded':
        return 'bg-orange-100 text-orange-700';
      case 'credit scoring':
        return 'bg-indigo-100 text-indigo-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-[#E2E8F0] sticky top-0 z-50 -mx-4 lg:-mx-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between px-4 lg:px-8 py-3 md:py-4 gap-4">
          <div className="flex items-center justify-between md:justify-start gap-4 flex-1 w-full">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Toggle Sidebar"
              >
                <Menu className="w-5 h-5 text-slate-600" />
              </button>
              <h1 className="text-xl sm:text-[28px] font-bold text-[#1E293B] whitespace-nowrap">
                AI Credit Dashboard
              </h1>
            </div>
            <div className="relative flex-1 max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all text-sm"
              />
            </div>
            {/* Mobile Search Button or Toggle could go here if needed, but for now we prioritize the header layout */}
          </div>
          <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 w-full md:w-auto">
            <div className="relative sm:hidden flex-1 mr-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-[#E2E8F0] rounded-lg text-xs"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="relative p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-[#64748B]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="flex items-center gap-2 sm:gap-3 sm:pl-4 sm:border-l sm:border-[#E2E8F0]">
                <div className="text-right hidden xs:block">
                  <p className="text-[10px] sm:text-sm font-semibold text-[#1E293B] truncate max-w-[80px] sm:max-w-none">Credit Manager</p>
                  <p className="text-[8px] sm:text-xs text-[#64748B] truncate max-w-[80px] sm:max-w-none">manager@bank.com</p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="p-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              x: [0, 50, 0], 
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              x: [0, -40, 0], 
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
              rotate: [0, -3, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-emerald-300/10 rounded-full blur-[140px]"
          />
          
          {/* Subtle Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              initial={{ 
                x: Math.random() * 1000, 
                y: Math.random() * 1000, 
                opacity: 0 
              }}
              animate={{ 
                y: [null, Math.random() * -200],
                opacity: [0, 0.4, 0]
              }}
              transition={{ 
                duration: 10 + Math.random() * 20, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
              }}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            />
          ))}
        </div>

        <div className="relative z-10">
          {/* KPI Metrics Cards */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
          >
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)"
                  }}
                  className="bg-white/90 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex flex-col gap-3 transition-all duration-500 group cursor-pointer border border-white/40 overflow-hidden relative"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-center justify-between mb-2">
                    <motion.div 
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      className={`p-4 rounded-2xl bg-gradient-to-br ${stat.bgGradient} transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/10`}
                    >
                      <Icon className="w-6 h-6 text-blue-600" />
                    </motion.div>
                    <div className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' :
                      stat.trend === 'down' ? 'bg-red-50 text-red-600' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                      <motion.div 
                        animate={stat.trend !== 'neutral' ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={`w-1.5 h-1.5 rounded-full ${stat.trend === 'up' ? 'bg-emerald-500' : stat.trend === 'down' ? 'bg-red-500' : 'bg-slate-400'}`} 
                      />
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-[36px] font-black text-[#0A2540] mb-0.5 tracking-tighter group-hover:text-blue-600 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-[#64748B] font-black uppercase tracking-[0.2em]">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Credit Risk Score Gauge + AI Engine */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.01, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.05)" }}
              className="bg-white/80 backdrop-blur-md rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 flex flex-col items-center justify-center transition-all duration-500 border border-white/20"
            >
              <h3 className="text-[18px] font-bold text-[#1E293B] mb-6 uppercase tracking-wider">Credit Risk Score</h3>
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90 w-48 h-48">
                  <circle cx="96" cy="96" r="88" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                  <motion.circle
                    cx="96" cy="96" r="88"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - creditScore / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="text-5xl font-bold text-[#0A2540]"
                  >
                    {creditScore}
                  </motion.span>
                  <span className="text-xs text-[#64748B] font-bold uppercase tracking-widest mt-1">/ 100</span>
                </div>
              </div>
                <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className={`mt-6 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm ${
                  creditScore >= 70 ? 'bg-emerald-100 text-emerald-700' :
                  creditScore >= 40 ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}
              >
                {creditScore >= 70 ? 'Low Risk' : creditScore >= 40 ? 'Medium Risk' : 'High Risk'}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.01 }}
              className="lg:col-span-2 bg-gradient-to-br from-[#0A2540] to-[#1E3A5F] text-white rounded-[24px] p-8 shadow-2xl relative overflow-hidden transition-all duration-500"
            >
              {/* Background accent */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

              <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="relative">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-white/20 shadow-lg group">
                    <img src="/bankpilot-logo.jpg" alt="BankPilot Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="absolute -inset-1 bg-blue-400/20 rounded-2xl animate-ping -z-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">BankPilot AI Engine</h3>
                  <p className="text-blue-200/80 text-sm font-medium">Real-time credit intelligence pipeline</p>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                {aiSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentAIStep;
                  const isComplete = index < currentAIStep;

                  return (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-5 p-4 rounded-2xl transition-all duration-500 border ${isActive
                        ? 'bg-white/15 backdrop-blur-md border-white/20 shadow-xl scale-[1.02]'
                        : 'bg-white/5 border-transparent'
                        }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-inner ${isComplete ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        isActive ? 'bg-blue-500/30 text-white animate-pulse border border-blue-400/50' : 'bg-white/5 text-white/30'
                        }`}>
                        {isComplete ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white/40'}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className={`text-sm font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-white/60'}`}>{step.text}</span>
                        {isActive && <div className="text-[10px] text-blue-300 font-bold mt-0.5 animate-pulse uppercase tracking-widest whitespace-nowrap">Processing Neural Assets...</div>}
                      </div>
                      {isActive && <Zap className="w-5 h-5 text-yellow-400 animate-bounce" />}
                      {isComplete && <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Optimized</div>}
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 relative pt-2">
                <div className="flex justify-between text-[10px] font-bold text-blue-200/60 uppercase tracking-widest mb-2">
                  <span>Engine Load • Neural Inference Processing</span>
                  <span>{Math.round(((currentAIStep + 1) / aiSteps.length) * 100)}%</span>
                </div>
                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentAIStep + 1) / aiSteps.length) * 100}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 relative z-10"
                  />
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Financial Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <motion.div
              variants={scaleIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.01 }}
              className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 hover:shadow-2xl transition-all duration-500 border border-white/20"
            >
              <h3 className="text-[18px] font-bold text-[#1E293B] mb-6 flex items-center gap-2 uppercase tracking-wider">
                <TrendingUp className="w-5 h-5 text-[#2563EB]" />
                Revenue Trend Analysis
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueTrend}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#6b7280" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" animationDuration={2000} />
                  <Line type="monotone" dataKey="target" stroke="#06B6D4" strokeWidth={2} strokeDasharray="5 5" animationDuration={2500} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              variants={scaleIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-6 hover:shadow-xl transition-shadow border border-white/20"
            >
              <h3 className="text-[18px] font-bold text-[#1E293B] mb-6 uppercase tracking-wider">Risk Distribution</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    animationBegin={200}
                    animationDuration={1500}
                  >
                    {riskData.map((entry: any) => (
                      <Cell key={`pie-cell-${entry.name}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 mt-4">
                {riskData.map((item: any) => (
                  <div key={item.name} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider group-hover:text-[#1E293B] transition-colors">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-[#1E293B]">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Applications and Risk Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden"
            >
              <div className="p-6 border-b border-[#E2E8F0]/50 bg-gradient-to-r from-slate-50 to-white/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-[18px] font-bold text-[#1E293B] uppercase tracking-wider">Evaluation Hub</h3>
                  <Link to="/app/upload" className="text-xs text-[#2563EB] hover:text-[#1e40af] font-bold flex items-center gap-2 group uppercase tracking-widest px-4 py-2 bg-blue-50 rounded-full transition-all hover:bg-blue-100">
                    New Application
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="responsive-table-container">
                <table className="w-full">
                  <thead className="bg-[#F8FAFC]/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest whitespace-nowrap">Company</th>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest whitespace-nowrap">Amount</th>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest whitespace-nowrap">Status</th>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest whitespace-nowrap">Risk Level</th>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]/50">
                    {apps.map((app: any, idx: number) => (
                      <motion.tr
                        key={app.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                      >
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform flex-shrink-0">
                              <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="font-bold text-[#1E293B] text-sm">{app.company}</div>
                                {app.ews && (
                                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-red-100 text-red-600 rounded text-[8px] font-black uppercase animate-pulse">
                                    <AlertTriangle className="w-2.5 h-2.5" />
                                    EWS
                                  </div>
                                )}
                              </div>
                              <div className="text-[10px] text-[#64748B] font-bold uppercase tracking-widest mt-0.5">{app.sector} • {app.id.slice(0, 8)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 font-bold text-[#1E293B] text-sm">
                            <DollarSign className="w-4 h-4 text-[#2563EB]" />
                            {app.amount}
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${getStatusBadgeColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${getRiskBadgeColor(app.riskLevel)}`}>
                            {app.riskLevel} Risk
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <Link to={`/app/risk-intelligence/${app.id}`} className="p-2 bg-slate-100 rounded-lg text-[#2563EB] hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center w-max shadow-sm">
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </motion.div>

            <EarlyWarningSignals alerts={recentAlerts} fraudFlags={analysisHistory.flatMap((h: any) => h.fraud_flags || [])} />
          </div>

          {/* Advanced Fintech Components Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Company Intelligence Timeline */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.01 }}
              className="bg-white/80 backdrop-blur-md rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 hover:shadow-2xl transition-all duration-500 border border-white/20"
            >
              <h3 className="text-[18px] font-bold text-[#1E293B] mb-8 flex items-center gap-2 uppercase tracking-wider">
                <Activity className="w-5 h-5 text-[#2563EB]" />
                Intelligence Stream
              </h3>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-cyan-300 to-transparent"></div>
                <div className="space-y-6">
                  {(latestAnalysis?.rationales || [
                    { title: 'System Initialization', desc: 'Analyzing current portfolio health' },
                    { title: 'Neural Engine Ready', desc: 'Credit decision models online' }
                  ]).map((event: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9, x: -10 }}
                      whileInView={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="relative pl-10 group"
                    >
                      <div className="absolute left-0 w-6 h-6 rounded-full flex items-center justify-center shadow-lg z-10 bg-gradient-to-br from-blue-600 to-cyan-500 shadow-blue-500/30 group-hover:scale-125 transition-transform duration-300">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      </div>
                      <div className="bg-slate-50/50 backdrop-blur-sm border border-[#E2E8F0]/50 rounded-[20px] p-5 hover:bg-white transition-all hover:shadow-xl group-hover:translate-x-1 border-l-4 border-l-blue-500/30 group-hover:border-l-blue-500">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">LATEST ANALYSIS</span>
                          <span className="text-[10px] font-bold text-slate-400">JUST NOW</span>
                        </div>
                        <h4 className="font-black text-[#1E293B] text-sm mt-1">{typeof event === 'string' ? event.split(':')[0] : event.title}</h4>
                        <p className="text-[11px] text-[#64748B] font-medium leading-relaxed mt-1.5">{typeof event === 'string' ? event.split(':')[1] || 'Verified observation' : event.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Management Trust Score */}
            <div className="bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-[20px] font-semibold text-[#1E293B] mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#10B981]" />
                Management Trust Score
              </h3>
              <div className="flex flex-col items-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle cx="64" cy="64" r="56" stroke="#10b981" strokeWidth="8" fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - (latestAnalysis?.score ? (latestAnalysis.score * 0.9 + 10) : 88) / 100)}`}
                      strokeLinecap="round" className="transition-all duration-700" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-[#0A2540]">{Math.round(latestAnalysis?.score ? (latestAnalysis.score * 0.9 + 10) : 88)}</span>
                    <span className="text-xs text-[#64748B]">/ 100</span>
                  </div>
                </div>
                <span className="mt-2 px-3 py-1 bg-[#D1FAE5] text-[#10B981] rounded-full text-xs font-semibold">
                  {latestAnalysis?.score > 60 ? 'High Trust' : 'Requires Due Diligence'}
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Track Record', score: 92 },
                  { label: 'Transparency', score: 85 },
                  { label: 'Governance', score: 87 }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B]">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-[#E2E8F0] rounded-full">
                        <div className="h-1.5 bg-[#10B981] rounded-full" style={{ width: `${item.score}%` }}></div>
                      </div>
                      <span className="text-[#1E293B] font-bold w-8">{item.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Document Insights */}
            <div className="bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-[20px] font-semibold text-[#1E293B] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                AI Document Insights
              </h3>
              <div className="space-y-3">
                {(docInsights.length > 0 ? docInsights : [
                  { doc: 'Financial Statements', status: 'Pending', confidence: 0, color: 'gray' },
                  { doc: 'Bank Statements', status: 'Pending', confidence: 0, color: 'gray' }
                ]).map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#1E293B]">{item.doc}</p>
                      <p className="text-xs text-[#64748B]">AI Confidence: {item.confidence}%</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 
                      item.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                      item.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Fintech Components Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Credit Policy Compliance */}
            <div className="bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-[20px] font-semibold text-[#1E293B] mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#2563EB]" />
                Credit Policy Compliance
              </h3>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-[#64748B]">Overall Compliance</span>
                  <span className="text-2xl font-bold text-[#10B981]">{latestAnalysis?.compliance || 0}%</span>
                </div>
                <div className="w-full h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div className="h-3 bg-gradient-to-r from-[#10B981] to-[#2563EB] rounded-full" style={{ width: `${latestAnalysis?.compliance || 0}%` }}></div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { rule: 'Debt Service Coverage', status: 'Pass', icon: '✓' },
                  { rule: 'Collateral Coverage', status: 'Pass', icon: '✓' },
                  { rule: 'Industry Exposure', status: 'Pass', icon: '✓' },
                  { rule: 'Promoter Background', status: 'Review', icon: '!' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <span className="text-sm text-[#64748B]">{item.rule}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === 'Pass' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                      {item.icon} {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ESG Risk Assessment */}
            <div className="bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-[20px] font-semibold text-[#1E293B] mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
                ESG Risk Assessment
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Environmental', score: 72, color: 'emerald' },
                  { label: 'Social', score: 68, color: 'blue' },
                  { label: 'Governance', score: 85, color: 'purple' }
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className={`text-2xl font-bold bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 bg-clip-text text-transparent`}>
                      {item.score}
                    </div>
                    <div className="text-xs text-[#64748B] mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
                <p className="text-sm font-semibold text-emerald-900">ESG Score: {Math.round(latestAnalysis?.score ? (latestAnalysis.score * 0.8 + 15) : 75)}/100</p>
                <p className="text-xs text-emerald-700 mt-1">
                  {latestAnalysis?.score > 50 ? 'Above industry average. Low ESG risk.' : 'Industry average ESG positioning.'}
                </p>
              </div>
            </div>

            {/* AI Recommended Credit Limit */}
            <div className="bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 text-white hover:shadow-xl transition-shadow">
              <h3 className="text-[20px] font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                AI Recommended Credit Limit
              </h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold mb-2">{latestAnalysis?.limit || '₹0.0 Cr'}</div>
                <div className="text-sm text-white/80">Optimal credit exposure</div>
              </div>
              <div className="space-y-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                {[
                  { label: 'Min Safe Limit', value: latestAnalysis?.limit || '₹0.0 Cr' },
                  { label: 'Recommended', value: latestAnalysis?.limit || '₹0.0 Cr' },
                  { label: 'Max Limit', value: `₹${(parseFloat(latestAnalysis?.limit?.replace(/[^\d.]/g, '') || '0') * 1.2).toFixed(1)} Cr` }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-white/80">{item.label}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-2 bg-white/20 rounded-lg text-center text-xs">
                AI Confidence: {latestAnalysis?.score ? (latestAnalysis.score + 15) : 0}%
              </div>
            </div>
          </div>

          {/* Advanced Fintech Components Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Portfolio Risk Distribution */}
            <div className="bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-[20px] font-semibold text-[#1E293B] mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Portfolio Risk Distribution
              </h3>
              <div className="space-y-3">
                {(sectorDist.length > 0 ? sectorDist : [
                  { sector: 'IT Services', exposure: 40, risk: 'Low', color: 'emerald' },
                  { sector: 'Manufacturing', exposure: 30, risk: 'Medium', color: 'amber' },
                  { sector: 'Others', exposure: 30, risk: 'Low', color: 'emerald' }
                ]).map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-[#1E293B]">{item.sector}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#64748B]">{item.exposure}%</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                          item.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                          {item.risk}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                      <div className={`h-2 bg-gradient-to-r ${item.color === 'emerald' ? 'from-emerald-400 to-emerald-600' :
                        item.color === 'amber' ? 'from-amber-400 to-amber-600' :
                          'from-red-400 to-red-600'
                        } rounded-full`} style={{ width: `${item.exposure}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What-if Risk Simulator */}
            <div className="bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-[20px] font-semibold text-[#1E293B] mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                What-if Risk Simulator
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Revenue (₹ Cr)', value: latestAnalysis?.extracted_data?.revenue || 62, min: 10, max: 150 },
                  { label: 'Debt/Equity Ratio', value: latestAnalysis?.extracted_data?.debt_ratio || 0.8, min: 0, max: 3, step: 0.1 },
                  { label: 'Profit Margin (%)', value: Math.round((latestAnalysis?.extracted_data?.profit_margin || 0.22) * 100), min: 0, max: 50 }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-[#64748B]">{item.label}</label>
                      <span className="text-lg font-bold text-[#1E293B]">{item.value}</span>
                    </div>
                    <input
                      type="range"
                      min={item.min}
                      max={item.max}
                      step={item.step || 1}
                      value={item.value}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-gradient-to-r from-[#D1FAE5] to-[#DBEAFE] rounded-lg border-2 border-[#10B981]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#64748B]">Simulated Risk Score</p>
                    <p className="text-3xl font-bold text-[#10B981]">{creditScore}/100</p>
                  </div>
                  <div className={`px-4 py-2 text-white rounded-full font-semibold text-sm ${
                    creditScore >= 70 ? 'bg-[#10B981]' : creditScore >= 40 ? 'bg-amber-500' : 'bg-red-500'
                  }`}>
                    {creditScore >= 70 ? 'Low Risk' : creditScore >= 40 ? 'Medium Risk' : 'High Risk'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Analysis History ─────────────────────────────────── */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-md rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-white/20 overflow-hidden mt-6"
          >
            <div className="p-6 border-b border-[#E2E8F0]/50 bg-gradient-to-r from-slate-50 to-white/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#1E293B] uppercase tracking-wider">Analysis History</h3>
                  <p className="text-[10px] text-[#64748B] font-semibold uppercase tracking-widest">
                    {analysisHistory.length} completed {analysisHistory.length === 1 ? 'analysis' : 'analyses'} · auto-saved
                  </p>
                </div>
              </div>
              <Link
                to="/app/upload"
                className="text-xs text-[#2563EB] hover:text-[#1e40af] font-bold flex items-center gap-2 group uppercase tracking-widest px-4 py-2 bg-blue-50 rounded-full transition-all hover:bg-blue-100"
              >
                New Analysis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {historyLoading ? (
              <div className="flex items-center justify-center py-16 gap-3 text-[#64748B]">
                <div className="w-6 h-6 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-semibold uppercase tracking-widest">Loading history...</span>
              </div>
            ) : analysisHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center px-8">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
                  <Brain className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <p className="font-bold text-[#1E293B] text-lg">No analyses yet</p>
                  <p className="text-sm text-[#64748B] mt-1">Upload documents and run an analysis — results will appear here automatically.</p>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <Link
                    to="/app/upload"
                    className="group relative px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-3 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Initiate Premium Analysis
                  </Link>
                </motion.div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8FAFC]/70">
                    <tr>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Analysis ID</th>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Company</th>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Risk Score</th>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Decision</th>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Fraud Flags</th>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Date / Time</th>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest">View</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]/50">
                    {analysisHistory.map((record: any, idx: number) => {
                      const score = record.risk_score ?? 0;
                      const scoreColor =
                        score >= 70 ? 'text-red-600 bg-red-50 border-red-200'
                        : score >= 40 ? 'text-amber-600 bg-amber-50 border-amber-200'
                        : 'text-emerald-600 bg-emerald-50 border-emerald-200';
                      const decisionColor =
                        record.loan_decision === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-700'
                          : record.loan_decision === 'REJECTED'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700';
                      const decisionIcon =
                        record.loan_decision === 'APPROVED' ? '✓'
                        : record.loan_decision === 'REJECTED' ? '✗'
                        : '⚠';
                      const dt = record.timestamp ? new Date(record.timestamp) : null;
                      const dateStr = dt
                        ? dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                        : 'N/A';
                      const timeStr = dt
                        ? dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                        : '';

                      return (
                        <motion.tr
                          key={record.analysis_id || idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                        >
                          {/* Analysis ID */}
                          <td className="px-6 py-5">
                            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-lg">
                              {record.analysis_id || 'N/A'}
                            </span>
                          </td>

                          {/* Company */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                <Building2 className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="font-bold text-[#1E293B] text-sm leading-tight">{record.company_name || 'Unknown'}</p>
                                <p className="text-[10px] text-[#64748B] font-semibold uppercase tracking-widest mt-0.5">
                                  {record.loan_amount ? `₹${record.loan_amount} Cr requested` : 'Amount N/A'}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Risk Score */}
                          <td className="px-6 py-5">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-black text-sm ${scoreColor}`}>
                              <BarChart3 className="w-4 h-4" />
                              {score}
                              <span className="text-[9px] font-bold opacity-60">/100</span>
                            </div>
                          </td>

                          {/* Decision */}
                          <td className="px-6 py-5">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${decisionColor}`}>
                              {decisionIcon} {record.loan_decision || 'REVIEW'}
                            </span>
                          </td>

                          {/* Fraud Flags */}
                          <td className="px-6 py-5">
                            {Array.isArray(record.fraud_flags) && record.fraud_flags.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {record.fraud_flags.slice(0, 2).map((flag: string, fi: number) => (
                                  <span key={fi} className="px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                                    <AlertTriangle className="w-2.5 h-2.5" />
                                    {flag.length > 20 ? flag.slice(0, 20) + '…' : flag}
                                  </span>
                                ))}
                                {record.fraud_flags.length > 2 && (
                                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-bold">
                                    +{record.fraud_flags.length - 2}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" /> None
                              </span>
                            )}
                          </td>

                          {/* Date/Time */}
                          <td className="px-6 py-5">
                            <div>
                              <p className="text-sm font-bold text-[#1E293B]">{dateStr}</p>
                              <p className="text-[10px] text-[#64748B] font-semibold">{timeStr}</p>
                            </div>
                          </td>

                          {/* View Button */}
                          <td className="px-6 py-5">
                            <Link
                              to={`/app/risk-intelligence/${record.session_id}`}
                              className="p-2 bg-slate-100 rounded-lg text-[#2563EB] hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center w-max shadow-sm"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
          {/* ── /Analysis History ──────────────────────────────────── */}

        </div>
      </div>
    </div>
  );
}
