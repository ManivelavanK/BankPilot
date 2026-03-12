import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Upload,
  FileText,
  LogOut,
  Brain,
  Shield,
  Building2,
  Calculator,
  PieChart,
  FileSearch,
  Settings,
  Menu,
  X,
  MessageSquare,
  BarChart3,
  Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";
import { ScrollToTop } from "./ScrollToTop";
import { AnimatedBackground } from "./AnimatedBackground";
import { PageTransition } from "./PageTransition";
import { motion, AnimatePresence } from "framer-motion";

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastAnalysisId, setLastAnalysisId] = useState<string | null>(() => localStorage.getItem('last_analysis_id'));

  // Update lastAnalysisId whenever location changes (or on mount)
  useEffect(() => {
    const id = localStorage.getItem('last_analysis_id');
    if (id !== lastAnalysisId) setLastAnalysisId(id);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const menuItems = [
    { path: '/app', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/app/upload', label: 'Upload Documents', icon: Upload },
    { 
      path: '/app/risk-intelligence', 
      label: 'AI Risk Intelligence', 
      icon: Brain 
    },
    { path: '/app/industry-benchmark', label: 'Industry Benchmark', icon: BarChart3 },
    { path: '/app/loan-simulator', label: 'Loan Simulator', icon: Calculator },
    { path: '/app/portfolio-risk', label: 'Portfolio Risk Monitor', icon: PieChart },
    { path: '/app/credit-policy', label: 'Credit Policy Engine', icon: Settings },
    { path: '/app/ai-analyst', label: 'AI Credit Analyst', icon: Sparkles },
    { path: '/app/ai-copilot', label: 'AI Copilot', icon: MessageSquare },
    { path: '/app/cam-report', label: 'CAM Report', icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden relative">
      <AnimatedBackground />
      <ScrollToTop />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={`
          fixed top-0 left-0 h-screen w-64 
          bg-[#0A2540]/95 backdrop-blur-xl
          text-white shadow-2xl z-40
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Branding Section */}
        <div className="p-6 border-b border-[#1e3a5f]/50 flex-shrink-0">
          <div className="flex flex-col items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 rounded-2xl overflow-hidden shadow-2xl drop-shadow-[0_0_15px_rgba(37,99,235,0.3)] bg-white"
            >
              <img
                src="/bankpilot-logo.jpg"
                alt="BankPilot Logo"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="text-center">
              <h1 className="font-bold text-xl text-white tracking-tight">BankPilot</h1>
              <p className="text-[10px] text-[#CBD5E1] font-medium mt-1 uppercase tracking-wider">AI Credit Intelligence</p>
            </div>
          </div>
        </div>

        {/* Navigation Section - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
          <div className="flex flex-col space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = item.exact
                ? location.pathname === item.path
                : isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${active
                    ? 'text-white'
                    : 'text-[#CBD5E1] hover:bg-white/5 hover:text-white'
                    }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-cyan-500/80 rounded-xl -z-10 shadow-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`w-5 h-5 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="font-medium text-[14px]">{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile Section - Fixed at bottom */}
        <div className="border-t border-[#1e3a5f]/50 p-4 flex-shrink-0 bg-black/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-semibold text-sm">CM</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#0A2540] rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Credit Manager</p>
              <p className="text-[10px] text-[#CBD5E1] truncate font-medium">manager@bank.com</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors group flex-shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4 text-[#CBD5E1] group-hover:text-white transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main id="main-content" className="flex-1 overflow-auto bg-transparent relative lg:ml-64">
        <PageTransition>
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </PageTransition>
      </main>
    </div>
  );
}
