import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import {
  Brain, Shield, FileText, TrendingUp, BarChart3, Zap,
  CheckCircle, ArrowRight, Upload, Activity, Sparkles,
  Database, ShieldCheck, Cpu, PlayCircle, Layers, MousePointer2,
  Lock, Landmark, PieChart, Receipt, Server, ShieldPlus, Users, Monitor, Workflow
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FintechLightBackground } from '../components/FintechLightBackground';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { AIScanLine } from '../components/AIScanLine';
import { CreditGauge, GrowthGraphMini } from '../components/BankingVisuals';
import { fadeInUp, staggerContainerDelta } from '../components/MotionUtils';

const productFeatures = [
  {
    icon: Brain,
    title: 'Document Intelligence',
    desc: 'Automated neural extraction of complex bank statements, tax returns, and corporate filings with 99.9% semantic accuracy.',
    color: 'blue'
  },
  {
    icon: Activity,
    title: 'Risk Scoring Engine',
    desc: 'Advanced predictive modeling analyzing hundreds of behavioral and financial data points to output institutional credit ratings.',
    color: 'cyan'
  },
  {
    icon: ShieldPlus,
    title: 'Fraud Detection',
    desc: 'Real-time anomaly detection identifying circular transactions and suspicious financial patterns with hyper-scale analytical kernels.',
    color: 'indigo'
  },
  {
    icon: Sparkles,
    title: 'Loan Recommendation',
    desc: 'Neural reasoning engine that provides decision-ready loan approval logic based on deep institutional risk protocols.',
    color: 'emerald'
  }
];

const aiSteps = [
  { icon: FileText, title: 'Company Documents', desc: 'Secure ingestion of raw financial data streams.' },
  { icon: Layers, title: 'Data Extraction', desc: 'Neural parsing of unstructured institutional records.' },
  { icon: Cpu, title: 'Model Analysis', desc: 'Active processing through deep learning credit kernels.' },
  { icon: TrendingUp, title: 'Score Generation', desc: 'Final predictive scoring and rating output.' },
  { icon: CheckCircle, title: 'Loan Recommendation', desc: 'Finalized logic-ready CAM for institutional approval.' }
];

const infrastructureNodes = [
  { icon: Upload, title: 'Data Ingestion', desc: 'Scalable secure conduit for bulk financial data.', x: '25%', y: '20%' },
  { icon: Cpu, title: 'AI Processing Layer', desc: 'Neural extraction cluster for high-fidelity parsing.', x: '50%', y: '40%' },
  { icon: Brain, title: 'Decision Engine', desc: 'The core reasoning kernel for risk evaluation.', x: '25%', y: '60%' },
  { icon: Monitor, title: 'Dashboard', desc: 'Premium terminal for real-time portfolio management.', x: '75%', y: '40%' }
];



const stats = [
  { label: 'Companies Analyzed', value: 1200, suffix: '+', prefix: '' },
  { label: 'Documents Processed', value: 5000, suffix: '+', prefix: '' },
  { label: 'Model Accuracy', value: 98, suffix: '%', prefix: '' },
  { label: 'Institutional Score', value: 942, suffix: '', prefix: '' },
];

export function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('');
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dashboardRef.current) return;
    const rect = dashboardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['home', 'infrastructure', 'product', 'ai-engine', 'contact'];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Product', id: 'product' },
    { name: 'AI Engine', id: 'ai-engine' },
    { name: 'Infrastructure', id: 'infrastructure' },
    { name: 'CONTACT', id: 'contact' }
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-900 selection:bg-blue-200 overflow-x-hidden font-body">
      <FintechLightBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200/50 bg-white/60 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden group-hover:scale-110 transition-transform">
              <img src="/bankpilot-logo.jpg" alt="BankPilot Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic font-heading text-[#0B3D5B]">BankPilot</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link transition-all duration-300 hover:text-[#1E88E5] relative py-2 ${activeSection === item.id ? 'text-[#1E88E5] font-black' : ''
                  }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#1E88E5] rounded-full"
                  />
                )}
              </a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to="/login"
              className="px-6 py-2.5 bg-[#0B3D5B] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#1E88E5] transition-all shadow-md active:scale-95"
            >
              Portal Login
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-10 pb-24 px-6 overflow-hidden min-h-[85vh] flex items-center">
        {/* Hero AI Data Nodes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 1000,
                y: Math.random() * 500,
                opacity: 0
              }}
              animate={{
                x: [null, Math.random() * 1000],
                y: [null, Math.random() * 500],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute w-1.5 h-1.5 bg-[#14B8A6] rounded-full blur-[1px]"
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-16 relative z-10 w-full">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              variants={staggerContainerDelta}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/5 border border-blue-500/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1E88E5]">
                <Sparkles className="w-3 h-3 text-[#14B8A6]" />
                Institutional Credit Reasoning System
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#0B3D5B] py-2 font-heading">
                PRECISION <br /> <span className="text-[#1E88E5] italic">INTELLIGENCE</span> <br /> FOR BANKING
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed font-body">
                Automate institutional risk appraisal with neural extraction and predictive modeling. Transform months of data reconciliation into actionable insight.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                <Link
                  to="/login"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0B3D5B] to-[#087EA4] text-white rounded-2xl font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(11,61,91,0.3)] active:scale-95"
                >
                  <span className="relative z-10 font-heading">Initiate Verification</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-[#0B3D5B] transition-colors">
                  <PlayCircle className="w-5 h-5 text-[#14B8A6]" />
                  Neural Flow Simulation
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Animated Fintech Cards */}
          <div className="flex-1 hidden lg:block" />

          <div className="absolute right-[60px] top-[60%] -translate-y-1/2 hidden lg:flex flex-col items-end gap-6 z-10">
            {/* Card 1 — Loan Application */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative -top-6 right-40 w-64 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg p-4 transition-all duration-300 hover:translate-y-[-6px] animate-[float_6s_ease-in-out_infinite] overflow-hidden"
            >
              {/* AI Scanning Animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 blur-[2px] animate-scan" style={{ top: '-10px' }} />

              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#1E88E5]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-amber-50 text-amber-600 rounded-full animate-pulse">
                  Processing
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">TechCorp Solutions</div>
                <div className="text-xl font-black text-[#0B3D5B]">$2.5M</div>
              </div>
            </motion.div>

            {/* Card 2 — Risk Analysis */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative top-4 right-4 w-64 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg p-4 transition-all duration-300 hover:translate-y-[-6px] animate-[float_6s_ease-in-out_infinite]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-xs font-black text-[#0B3D5B] uppercase tracking-tighter">AI Risk Analysis</span>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span className="text-slate-400">Financial Score</span>
                    <span className="text-[#1E88E5]">82%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "82%" }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-[#1E88E5]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span className="text-slate-400">Compliance</span>
                    <span className="text-[#14B8A6]">91%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "91%" }} transition={{ duration: 1, delay: 0.8 }} className="h-full bg-[#14B8A6]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 — Loan Decision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="relative top-10 right-36 w-64 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg p-4 transition-all duration-300 hover:translate-y-[-6px] animate-[float_6s_ease-in-out_infinite]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#14B8A6]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-50 text-[#14B8A6] rounded-full">
                  Approved
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Loan Decision</div>
                <div className="text-xl font-black text-[#0B3D5B]">$2.5M</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="py-24 px-6 relative scroll-mt-24 min-h-[80vh] flex items-center" >
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <RevealOnScroll>
            <div className="mb-20 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-[#0B3D5B] font-heading">
                AI-Powered <span className="text-[#1E88E5]">Credit Decision</span> Platform
              </h2>
              <p className="text-slate-600 max-w-xl font-medium font-body mx-auto md:mx-0">
                BankPilot automates corporate credit evaluation by analyzing financial statements, transaction history, and business signals. The system transforms weeks of manual risk analysis into seconds using intelligent data extraction and predictive models.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <RevealOnScroll key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="group relative bg-white border border-slate-200 p-8 rounded-[2.5rem] hover:border-[#1E88E5]/50 transition-all overflow-hidden h-full shadow-sm hover:shadow-2xl"
                  >
                    <div className="relative z-10 space-y-6">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-[#0B3D5B] group-hover:text-white transition-all shadow-inner">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-lg font-black text-[#0B3D5B] tracking-tighter uppercase italic font-heading leading-tight">{feature.title}</h3>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed font-body">{feature.desc}</p>
                    </div>
                  </motion.div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section with Fixed Data Impact */}
      <section className="py-24 px-6 relative border-y border-slate-200/50 bg-white/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <div className="text-center group">
                <div className="text-4xl md:text-6xl font-black text-[#0B3D5B] mb-2 tracking-tighter">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  {stat.label}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* AI Engine Section - Visual Pipeline */}
      <section id="ai-engine" className="py-24 px-6 bg-slate-50 relative overflow-hidden scroll-mt-24 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto text-center">
          <RevealOnScroll>
            <div className="mb-24 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-[#0B3D5B] font-heading">
                Intelligent <span className="text-[#1E88E5]">Risk Analysis</span> Engine
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto font-medium font-body">
                The BankPilot AI Engine continuously analyzes financial indicators, detects anomalies, and evaluates company risk using machine learning models. It provides explainable insights that help credit officers make faster and more reliable lending decisions.
              </p>
            </div>
          </RevealOnScroll>

          <div className="relative px-12">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 hidden lg:block z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10">
              {aiSteps.map((step, i) => (
                <RevealOnScroll key={i} delay={i * 0.2}>
                  <div className="space-y-6 relative group">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-24 h-24 mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl flex items-center justify-center relative z-20 group-hover:border-[#1E88E5] transition-colors"
                    >
                      <step.icon className="w-10 h-10 text-[#0B3D5B] group-hover:text-[#1E88E5] transition-colors" />
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-50 rounded-full border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400">
                        0{i + 1}
                      </div>
                    </motion.div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-black text-[#0B3D5B] uppercase tracking-tighter">{step.title}</h4>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed px-4">{step.desc}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section - System Architecture */}
      <section id="infrastructure" className="py-24 px-6 relative overflow-hidden scroll-mt-24 bg-white min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <RevealOnScroll>
              <div className="space-y-8 text-left">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-[#0B3D5B] font-heading">
                  Enterprise-Grade <span className="text-[#1E88E5]">Financial Intelligence</span> Infrastructure
                </h2>
                <p className="text-slate-600 font-medium leading-relaxed font-body">
                  BankPilot is built on a secure and scalable architecture designed for banking environments. The platform processes large volumes of financial data, integrates with banking systems, and ensures real-time analytics for corporate loan evaluation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {infrastructureNodes.map((node, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                        <node.icon className="w-5 h-5 text-[#1E88E5]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-[#0B3D5B] uppercase tracking-tighter">{node.title}</h4>
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{node.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="relative h-[500px] bg-slate-50 rounded-[3rem] border border-slate-100 overflow-hidden group">
                <AIScanLine color="#1E88E5" />
                {/* Node Diagram Mockup */}
                <div className="absolute inset-0 p-12">
                  <div className="relative w-full h-full">
                    {infrastructureNodes.map((node, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          opacity: { delay: i * 0.2 },
                          scale: { delay: i * 0.2 },
                          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                        }}
                        style={{ top: node.y, left: node.x }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                      >
                        <div className="w-20 h-20 bg-white rounded-2xl border border-slate-200 shadow-xl flex items-center justify-center group-hover:border-[#1E88E5] transition-colors">
                          <node.icon className="w-8 h-8 text-[#0B3D5B] group-hover:text-[#1E88E5] transition-colors" />
                        </div>
                      </motion.div>
                    ))}
                    {/* Animated Connection Paths (SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                      <motion.path
                        d="M 25,20 L 50,40 L 25,60 L 75,40"
                        fill="none"
                        stroke="#1E88E5"
                        strokeWidth="2"
                        strokeDasharray="10 5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section className="scroll-mt-24 py-24 px-6 text-center relative overflow-hidden bg-white min-h-[80vh] flex items-center">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
          <RevealOnScroll>
            <div className="space-y-6">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none text-[#0B3D5B] font-heading">
                Connect With <span className="text-[#1E88E5]">BankPilot</span>
              </h2>
              <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto font-body">
                Interested in transforming your credit risk analysis workflow? Contact our team to explore how BankPilot can help your institution automate credit decisions and improve risk visibility.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/login"
                className="group relative px-12 py-6 bg-[#0B3D5B] text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-[#1E88E5] transition-all active:scale-95 overflow-hidden shadow-2xl"
              >
                <span className="relative z-10 font-heading">Activate Engine</span>
              </Link>
              <button className="px-12 py-6 bg-transparent border border-slate-300 text-[#0B3D5B] rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all font-heading">
                Schedule Technical Demo
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-32 px-6 border-t border-slate-200 bg-slate-50 relative scroll-mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <img src="/bankpilot-logo.jpg" alt="BankPilot Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-black italic tracking-tighter uppercase text-[#0B3D5B]">BankPilot</span>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] leading-relaxed">
                Global Headquarters <br /> 42 Banking Blvd, Fintech Plz <br /> NY, 10001
              </p>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  contact@bankpilot.ai
                </p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  +1 (888) 555-PLT
                </p>
              </div>
            </div>
          </div>

          {[
            { title: 'Platform', links: ['Neural Engine', 'Infrastructure', 'Risk Scoring', 'Integrations'] },
            { title: 'Company', links: ['About Delta', 'Neural Labs', 'Privacy Protocol', 'Contact Nodes'] },
            { title: 'Security', links: ['Trust Center', 'Compliance', 'Audit Log', 'Legal'] }
          ].map(col => (
            <div key={col.title} className="space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0B3D5B]">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-[11px] font-bold text-slate-500 hover:text-[#1E88E5] transition-colors uppercase tracking-widest">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">© 2026 BankPilot Intelligence • Institutional Integrity</p>
          <div className="flex items-center gap-8">
            <div className="flex gap-4">
              <Lock className="w-4 h-4 text-slate-300" />
              <ShieldCheck className="w-4 h-4 text-slate-300" />
            </div>
            <Sparkles className="w-4 h-4 text-slate-400 hover:text-[#14B8A6] cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}

