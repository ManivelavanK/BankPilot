import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Brain, Lock, Mail, Loader2, Sparkles, ShieldCheck, Database, Cpu, TrendingUp, BarChart2, DollarSign, Globe, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { floating, flipCard } from "../components/MotionUtils";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);
  const [authStep, setAuthStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authMessages = [
    { text: "Analyzing credentials...", icon: Mail },
    { text: "Connecting to BankPilot AI Engine...", icon: Cpu },
    { text: "Secure authentication in progress...", icon: ShieldCheck },
    { text: "Access Granted. Finalizing neural link...", icon: Sparkles }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsFlipping(true);
    } else {
      alert('Please enter email and password');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isFlipping) {
      const interval = setInterval(() => {
        setAuthStep((prev) => {
          if (prev < authMessages.length - 1) return prev + 1;
          clearInterval(interval);
          setTimeout(() => setIsLoggedIn(true), 1000);
          return prev;
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isFlipping]);

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        navigate('/app');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 flex flex-col items-center justify-center p-6 sm:p-4 overflow-x-hidden overflow-y-auto relative">
      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="sm:absolute sm:top-8 sm:left-8 z-50 mb-8 sm:mb-0 self-start sm:self-auto"
      >
        <Link
          to="/"
          className="group flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-blue-600 font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all shadow-xl"
        >
          <Activity className="w-4 h-4" />
          Back to Home
        </Link>
      </motion.div>

      {/* Financial Data Flow Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-100%", y: `${20 * i + 10}%` }}
            animate={{ x: "200%" }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30"
          />
        ))}
      </div>

      {/* Floating Financial Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { Icon: BarChart2, top: "10%", left: "15%" },
          { Icon: DollarSign, top: "25%", left: "80%" },
          { Icon: TrendingUp, top: "70%", left: "10%" },
          { Icon: Globe, top: "85%", left: "75%" },
          { Icon: Activity, top: "15%", left: "60%" },
          { Icon: Database, top: "60%", left: "85%" },
        ].map((item, i) => (
          <motion.div
            key={i}
            style={{ top: item.top, left: item.left }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute text-blue-600"
          >
            <item.Icon className="w-10 h-10" />
          </motion.div>
        ))}
      </div>

      {/* Financial Data Nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]"
          />
        ))}
      </div>

      {/* Animated Graph Line (SVG) */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            d="M0,800 Q150,750 300,700 T600,600 T900,450 T1000,400"
            fill="none"
            stroke="url(#graphGradient)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="graphGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <AnimatePresence>
        {!isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.5,
              rotate: 360,
              filter: "blur(20px)",
              transition: { duration: 1.5, ease: "easeInOut" }
            }}
            style={{ perspective: 2000 }}
            className="w-full max-w-lg z-10 my-10 sm:my-0"
          >
            <motion.div
              variants={{
                initial: { rotateY: 0 },
                flip: { rotateY: 180 },
                float: {
                  y: [0, -10, 0],
                  rotate: [0, 1, 0, -1, 0],
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
              }}
              initial="initial"
              animate={isFlipping ? "flip" : "float"}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full min-h-[400px] sm:aspect-[1.6/1]"
            >
              {/* Card Front */}
              <div
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B3D5B] via-[#0A4A6A] to-[#087EA4] bg-opacity-80 rounded-[2rem] shadow-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-xl flex flex-col justify-between"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-white/30 shadow-xl flex-shrink-0">
                      <img src="/bankpilot-logo.jpg" alt="BankPilot Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-heading">BankPilot</h1>
                      <p className="text-white/70 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">Credit Intelligence</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white/40" />
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6 mt-6 sm:mt-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/40 group-focus-within:text-white transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:bg-white/20 focus:outline-none focus:border-white/30 transition-all font-medium text-sm"
                        placeholder="demo email : demo@gmail.com"
                        required
                      />
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/40 group-focus-within:text-white transition-colors" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:bg-white/20 focus:outline-none focus:border-white/30 transition-all font-medium text-sm"
                        placeholder="demo password : demo123"
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 1)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-white/90 text-[#0B3D5B] py-3 sm:py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl transition-all font-heading"
                  >
                    Authenticate Access
                  </motion.button>
                </form>


                <div className="flex justify-between items-center opacity-40 mt-4">
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-white/20 rounded-[4px]" />
                    <div className="w-8 h-5 bg-white/20 rounded-[4px]" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase">Neural Link v4.2</span>
                </div>
              </div>

              {/* Card Back (AI Authentication) */}
              <div
                className="absolute inset-0 w-full h-full bg-[#020617]/80 rounded-[2rem] shadow-[0_50px_100px_rgba(37,99,235,0.3)] p-6 sm:p-10 border border-blue-500/30 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 sm:gap-8 overflow-hidden"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                {/* Scanning Line */}
                <motion.div
                  animate={{ top: ["-10%", "110%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.8)] z-20"
                />

                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#2563EB 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }} />

                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="w-24 h-24 border-2 border-blue-500/20 border-t-blue-500 rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="w-10 h-10 text-blue-500 animate-pulse" />
                  </div>
                </div>

                <div className="text-center space-y-4 relative z-10 w-full">
                  <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm">Fintech Intelligence Protocol</h2>
                  <div className="h-12 flex items-center justify-center">
                    <motion.div
                      key={authStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 text-white font-medium italic"
                    >
                      {authMessages[authStep].icon && (() => {
                        const Icon = authMessages[authStep].icon;
                        return <Icon className="w-5 h-5 text-blue-400" />;
                      })()}
                      <span>{authMessages[authStep].text}</span>
                    </motion.div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-blue-900/40 rounded-full overflow-hidden border border-blue-500/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(authStep + 1) * 25}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                  </div>
                </div>

                <div className="absolute bottom-6 flex gap-4 opacity-50">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                        className="w-4 h-1 bg-blue-500 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Swirl Transition Particles */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: (Math.random() - 0.5) * 1000,
                  y: (Math.random() - 0.5) * 1000,
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  x: 0,
                  y: 0,
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  rotate: 720
                }}
                transition={{
                  duration: 2.5,
                  delay: Math.random() * 0.5,
                  ease: "easeInOut"
                }}
                className={`absolute w-3 h-3 rounded-full blur-[2px] ${i % 2 === 0 ? 'bg-blue-500' : 'bg-cyan-400'}`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="sm:absolute sm:bottom-10 text-center text-xs text-blue-500/40 font-bold uppercase tracking-widest z-10 mt-8 sm:mt-0">
        © 2026 BankPilot Intelligence Systems • All Nodes Secured
      </p>
    </div>
  );
}
