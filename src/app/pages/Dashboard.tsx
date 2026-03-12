import { Link } from "react-router";
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
  Zap
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '../components/MotionUtils';
import EarlyWarningSignals from '../components/EarlyWarningSignals';

const stats = [
  {
    label: "Total Applications",
    value: "124",
    change: "+12.5%",
    trend: "up",
    icon: FileText,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100"
  },
  {
    label: "Approved Loans",
    value: "89",
    change: "+8.3%",
    trend: "up",
    icon: CheckCircle,
    gradient: "from-emerald-500 to-emerald-600",
    bgGradient: "from-emerald-50 to-emerald-100"
  },
  {
    label: "High Risk Companies",
    value: "8",
    change: "-2 from last week",
    trend: "down",
    icon: AlertTriangle,
    gradient: "from-red-500 to-red-600",
    bgGradient: "from-red-50 to-red-100"
  },
  {
    label: "Pending Reviews",
    value: "23",
    change: "Needs attention",
    trend: "neutral",
    icon: Clock,
    gradient: "from-amber-500 to-amber-600",
    bgGradient: "from-amber-50 to-amber-100"
  },
];

const recentApplications = [
  {
    id: "APP001",
    company: "TechVentures Pvt Ltd",
    amount: "₹5.2 Cr",
    status: "Under Review",
    riskLevel: "Low",
    date: "2026-03-08",
    sector: "IT Services"
  },
  {
    id: "APP002",
    company: "Global Manufacturing Co",
    amount: "₹12.5 Cr",
    status: "AI Analysis Complete",
    riskLevel: "Medium",
    date: "2026-03-07",
    sector: "Manufacturing"
  },
  {
    id: "APP003",
    company: "Aether Dynamics Pvt Ltd",
    amount: "₹8.5 Cr",
    status: "Analysis Complete",
    riskLevel: "Medium",
    date: "2026-03-06",
    sector: "Aerospace",
    ews: true
  },
  {
    id: "APP004",
    company: "Prime Logistics Pvt Ltd",
    amount: "₹3.8 Cr",
    status: "Approved",
    riskLevel: "Low",
    date: "2026-03-05",
    sector: "Logistics"
  },
  {
    id: "APP005",
    company: "Urban Infrastructure Ltd",
    amount: "₹25.0 Cr",
    status: "Credit Scoring",
    riskLevel: "Medium",
    date: "2026-03-04",
    sector: "Construction",
    ews: true
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

const riskDistribution = [
  { name: 'Low Risk', value: 65, color: '#10b981' },
  { name: 'Medium Risk', value: 27, color: '#f59e0b' },
  { name: 'High Risk', value: 8, color: '#ef4444' },
];

export function Dashboard() {
  const [currentAIStep, setCurrentAIStep] = useState(0);
  const [creditScore, setCreditScore] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timers = aiSteps.map((step, index) =>
      setTimeout(() => setCurrentAIStep(index), step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setCreditScore(76), 500);
    return () => clearTimeout(timer);
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
      <div className="bg-white shadow-sm border-b border-[#E2E8F0] sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-[28px] font-bold text-[#1E293B]">
              AI Credit Dashboard
            </h1>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search companies, applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-[#64748B]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-[#E2E8F0]">
              <div className="text-right">
                <p className="text-sm font-semibold text-[#1E293B]">Credit Manager</p>
                <p className="text-xs text-[#64748B]">manager@bank.com</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
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
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-md rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-6 flex flex-col gap-2 transition-shadow hover:shadow-2xl hover:shadow-blue-500/10 group cursor-pointer border border-white/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.bgGradient} transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${stat.trend === 'up' ? 'bg-emerald-100 text-emerald-700' :
                      stat.trend === 'down' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-[32px] font-bold text-[#0A2540] mb-0.5 tracking-tight group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#64748B] font-semibold uppercase tracking-widest">{stat.label}</div>
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
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 flex flex-col items-center justify-center hover:shadow-xl transition-shadow border border-white/20"
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
                className="mt-6 px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse shadow-sm"
              >
                Low Risk
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="lg:col-span-2 bg-gradient-to-br from-[#0A2540] to-[#1E3A5F] text-white rounded-[20px] p-8 shadow-2xl relative overflow-hidden"
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
                  <span>Engine Load</span>
                  <span>{Math.round(((currentAIStep + 1) / aiSteps.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentAIStep + 1) / aiSteps.length) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
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
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-6 hover:shadow-xl transition-shadow border border-white/20"
            >
              <h3 className="text-[18px] font-bold text-[#1E293B] mb-6 flex items-center gap-2 uppercase tracking-wider">
                <TrendingUp className="w-5 h-5 text-[#2563EB]" />
                Revenue Trend Analysis
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueData}>
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
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    animationBegin={200}
                    animationDuration={1500}
                  >
                    {riskDistribution.map((entry) => (
                      <Cell key={`pie-cell-${entry.name}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 mt-4">
                {riskDistribution.map((item) => (
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
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow border border-white/20 overflow-hidden"
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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8FAFC]/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Company</th>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Amount</th>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Risk Level</th>
                      <th className="px-6 py-4 text-left text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]/50">
                    {recentApplications.map((app, idx) => (
                      <motion.tr
                        key={app.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform">
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
                              <div className="text-[10px] text-[#64748B] font-bold uppercase tracking-widest mt-0.5">{app.sector} • {app.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1.5 font-bold text-[#1E293B] text-sm">
                            <DollarSign className="w-4 h-4 text-[#2563EB]" />
                            {app.amount}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${getStatusBadgeColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${getRiskBadgeColor(app.riskLevel)}`}>
                            {app.riskLevel} Risk
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <Link to={`/app/analysis/${app.id}`} className="p-2 bg-slate-100 rounded-lg text-[#2563EB] hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center w-max shadow-sm">
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <EarlyWarningSignals />
          </div>

          {/* Advanced Fintech Components Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Company Intelligence Timeline */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-6 hover:shadow-xl transition-shadow border border-white/20"
            >
              <h3 className="text-[18px] font-bold text-[#1E293B] mb-8 flex items-center gap-2 uppercase tracking-wider">
                <Activity className="w-5 h-5 text-[#2563EB]" />
                Intelligence Stream
              </h3>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-cyan-300 to-transparent"></div>
                <div className="space-y-6">
                  {[
                    { date: 'Mar 2026', title: 'Contract Acquisition', desc: '₹15 Cr Govt Partnership', type: 'positive' },
                    { date: 'Feb 2026', title: 'Fiscal Expansion', desc: 'Q4 Revenue +22% YoY', type: 'positive' },
                    { date: 'Jan 2026', title: 'Regulatory Audit', desc: 'Full Compliance Certified', type: 'neutral' },
                    { date: 'Dec 2025', title: 'Operational Dispute', desc: 'Minor Settlement Pending', type: 'negative' }
                  ].map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="relative pl-10 group"
                    >
                      <div className={`absolute left-0 w-6 h-6 rounded-full flex items-center justify-center shadow-lg z-10 ${event.type === 'positive' ? 'bg-emerald-500 shadow-emerald-500/30' : event.type === 'negative' ? 'bg-red-500 shadow-red-500/30' : 'bg-blue-500 shadow-blue-500/30'
                        }`}>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      </div>
                      <div className="bg-slate-50/50 backdrop-blur-sm border border-[#E2E8F0]/50 rounded-2xl p-4 hover:bg-white transition-all hover:shadow-md group-hover:translate-x-1">
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">{event.date}</span>
                        <h4 className="font-bold text-[#1E293B] text-sm mt-0.5">{event.title}</h4>
                        <p className="text-[11px] text-[#64748B] font-medium leading-relaxed mt-1">{event.desc}</p>
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
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.88)}`}
                      strokeLinecap="round" className="transition-all duration-700" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-[#0A2540]">88</span>
                    <span className="text-xs text-[#64748B]">/ 100</span>
                  </div>
                </div>
                <span className="mt-2 px-3 py-1 bg-[#D1FAE5] text-[#10B981] rounded-full text-xs font-semibold">High Trust</span>
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
                {[
                  { doc: 'Financial Statements', status: 'Verified', confidence: 98, color: 'emerald' },
                  { doc: 'Bank Statements', status: 'Verified', confidence: 95, color: 'emerald' },
                  { doc: 'GST Returns', status: 'Verified', confidence: 92, color: 'emerald' },
                  { doc: 'Legal Documents', status: 'Review', confidence: 78, color: 'amber' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#1E293B]">{item.doc}</p>
                      <p className="text-xs text-[#64748B]">AI Confidence: {item.confidence}%</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
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
                  <span className="text-2xl font-bold text-[#10B981]">94%</span>
                </div>
                <div className="w-full h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div className="h-3 bg-gradient-to-r from-[#10B981] to-[#2563EB] rounded-full" style={{ width: '94%' }}></div>
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
                <p className="text-sm font-semibold text-emerald-900">ESG Score: 75/100</p>
                <p className="text-xs text-emerald-700 mt-1">Above industry average. Low ESG risk.</p>
              </div>
            </div>

            {/* AI Recommended Credit Limit */}
            <div className="bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 text-white hover:shadow-xl transition-shadow">
              <h3 className="text-[20px] font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                AI Recommended Credit Limit
              </h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold mb-2">₹5.2 Cr</div>
                <div className="text-sm text-white/80">Optimal credit exposure</div>
              </div>
              <div className="space-y-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                {[
                  { label: 'Min Safe Limit', value: '₹3.8 Cr' },
                  { label: 'Recommended', value: '₹5.2 Cr' },
                  { label: 'Max Limit', value: '₹6.5 Cr' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-white/80">{item.label}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-2 bg-white/20 rounded-lg text-center text-xs">
                AI Confidence: 92%
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
                {[
                  { sector: 'IT Services', exposure: 28, risk: 'Low', color: 'emerald' },
                  { sector: 'Manufacturing', exposure: 22, risk: 'Medium', color: 'amber' },
                  { sector: 'Real Estate', exposure: 18, risk: 'High', color: 'red' },
                  { sector: 'Retail', exposure: 15, risk: 'Medium', color: 'amber' },
                  { sector: 'Others', exposure: 17, risk: 'Low', color: 'emerald' }
                ].map((item, i) => (
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
                  { label: 'Revenue (₹ Cr)', value: 62, min: 10, max: 150 },
                  { label: 'Debt/Equity Ratio', value: 0.8, min: 0, max: 3, step: 0.1 },
                  { label: 'Profit Margin (%)', value: 22, min: 0, max: 50 }
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
                      defaultValue={item.value}
                      className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-gradient-to-r from-[#D1FAE5] to-[#DBEAFE] rounded-lg border-2 border-[#10B981]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#64748B]">Simulated Risk Score</p>
                    <p className="text-3xl font-bold text-[#10B981]">76/100</p>
                  </div>
                  <div className="px-4 py-2 bg-[#10B981] text-white rounded-full font-semibold text-sm">
                    Low Risk
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
