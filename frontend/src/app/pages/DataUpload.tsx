import { useState, useRef, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Upload, FileText, CheckCircle2, X, FileCheck, AlertCircle, FileSpreadsheet, FileBarChart, Shield, Menu, Sparkles, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadDocuments } from "../../api";
import { fadeInUp, staggerContainer, scaleIn } from "../components/MotionUtils";

type UploadedFile = {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'uploading' | 'validating' | 'complete' | 'error';
  progress: number;
};

export function DataUpload() {
  const { setSidebarOpen } = useOutletContext<{ setSidebarOpen: (open: boolean) => void }>();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [fileObjects, setFileObjects] = useState<{ [key: string]: File }>({});
  const [companyName, setCompanyName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const documentTypes = [
    { label: "GST Filings", required: true, uploaded: false, icon: FileSpreadsheet },
    { label: "Bank Statements", required: true, uploaded: false, icon: FileBarChart },
    { label: "Annual Reports (PDF)", required: true, uploaded: false, icon: FileText },
    { label: "Financial Statements", required: true, uploaded: false, icon: FileBarChart },
    { label: "Director KYC", required: false, uploaded: false, icon: Shield },
    { label: "Collateral Documents", required: false, uploaded: false, icon: FileCheck },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    simulateFileUpload(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      simulateFileUpload(files);
    }
  };

  const simulateFileUpload = (files: File[]) => {
    files.forEach((file, index) => {
      const fileId = `file-${Date.now()}-${index}`;
      const typeLabel = getFileType(file.name);
      
      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        type: typeLabel,
        size: formatFileSize(file.size),
        status: 'complete', // In the prototype we don't show real progress, just set to complete
        progress: 100,
      };

      setUploadedFiles(prev => [...prev, newFile]);
      
      // Store the file object with a key that backend expects
      const backendKey = getBackendKey(file.name);
      setFileObjects(prev => ({ ...prev, [backendKey]: file }));
    });
  };

  const getBackendKey = (filename: string) => {
    const fn = filename.toLowerCase();
    if (fn.includes('gst')) return 'gst_data';
    if (fn.includes('bank')) return 'bank_statement';
    if (fn.includes('annual')) return 'annual_report';
    if (fn.includes('financial')) return 'financial_statement';
    if (fn.includes('kyc') || fn.includes('director')) return 'director_kyc';
    if (fn.includes('collateral')) return 'collateral_documents';
    return `doc_${Date.now()}`;
  };

  const getFileType = (filename: string) => {
    if (filename.toLowerCase().includes('gst')) return 'GST Filing';
    if (filename.toLowerCase().includes('bank')) return 'Bank Statement';
    if (filename.toLowerCase().includes('annual')) return 'Annual Report';
    if (filename.toLowerCase().includes('financial')) return 'Financial Statement';
    return 'Document';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleStartAnalysis = async () => {
    if (!companyName || !loanAmount) {
      setError("Please enter Company Name and Amount Required before starting AI Analysis.");
      setShowValidationErrors(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);
    setError(null);
    setShowValidationErrors(false);
    try {
      const formData = new FormData();
      Object.entries(fileObjects).forEach(([key, file]) => {
        formData.append(key, file);
      });
      formData.append('company_name', companyName);
      formData.append('requested_amount', loanAmount);
      
      const response = await uploadDocuments(formData);
      
      // Persist user-entered data for later retrieval
      localStorage.setItem(`company_name_${response.session_id}`, companyName);
      localStorage.setItem(`requested_loan_${response.session_id}`, loanAmount.toString());
      localStorage.setItem('last_analysis_id', response.session_id);
      
      navigate("/app/risk-intelligence");
    } catch (err) {
      console.error(err);
      setError("Failed to upload and process documents. Please check if the backend is running.");
      setIsProcessing(false);
    }
  };

  const canStartAnalysis = uploadedFiles.length >= 4 && companyName && loanAmount;

  return (
    <div className="bg-transparent relative pb-8">
      {/* Banking style background animation - Financial Network Flow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep blue/emerald glows */}
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-[#06B6D4]/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] bg-[#10B981]/15 rounded-full blur-[150px]"
        />

        {/* Currency/Data Flow Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`data-particle-${i}`}
            initial={{ 
              x: Math.random() * 1000, 
              y: 1100, 
              opacity: 0,
              scale: 0.5 + Math.random()
            }}
            animate={{ 
              y: -100,
              opacity: [0, 0.3, 0],
              x: (Math.random() * 1000) + (Math.sin(i) * 50)
            }}
            transition={{ 
              duration: 15 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 15
            }}
            className="absolute flex items-center gap-1 text-[#10B981]/20 font-black text-[10px]"
          >
            <div className="w-1 h-1 bg-current rounded-full" />
            {i % 3 === 0 && "₹"}
            {i % 3 === 1 && "DOC"}
            {i % 3 === 2 && "DATA"}
          </motion.div>
        ))}
        
        {/* Moving Financial Network Lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`flow-line-${i}`}
            initial={{ x: "-20%", y: `${10 + i * 12}%`, opacity: 0 }}
            animate={{ 
              x: "120%",
              opacity: [0, 0.15, 0]
            }}
            transition={{ 
              duration: 20 + i * 4, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 1.5
            }}
            className="absolute h-[1px] w-[300px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent transform rotate-[-15deg]"
          />
        ))}

        {/* Digital Grid nodes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute w-2 h-2 rounded-full bg-blue-400/10"
            style={{ 
              left: `${15 + i * 20}%`, 
              top: `${20 + (i % 3) * 25}%` 
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8
            }}
          >
            <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-slate-50/80 backdrop-blur-md -mx-4 px-4 py-4 sm:-mx-8 sm:px-8 sm:py-6 mb-6 sm:mb-8 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 hover:bg-white rounded-lg transition-colors border border-slate-200"
              aria-label="Toggle Sidebar"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">New Loan Application</h1>
          </div>
          <p className="text-sm sm:text-base text-slate-600">Upload company documents for AI-powered credit analysis</p>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-xs sm:text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Company Details Form - Use ref for scrolling */}
        <div ref={formRef} className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-lg mb-6 hover:shadow-xl transition-shadow relative overflow-hidden">
          <AnimatePresence>
            {showValidationErrors && (!companyName || !loanAmount) && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-0 left-0 right-0 p-2 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest text-center border-b border-red-100 z-20"
              >
                Missing Required Fields
              </motion.div>
            )}
          </AnimatePresence>

          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
            Application Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="relative">
              <label 
                htmlFor="companyName" 
                className={`block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 transition-colors ${showValidationErrors && !companyName ? 'text-red-500' : 'text-slate-700'}`}
              >
                Company Name *
              </label>
              <div className="relative">
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    if (e.target.value) setShowValidationErrors(false);
                  }}
                  className={`w-full px-4 py-2 sm:py-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white transition-all text-sm relative z-10 ${
                    showValidationErrors && !companyName 
                      ? 'border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                      : 'border-slate-300'
                  }`}
                  placeholder="Enter company name"
                />
                <AnimatePresence>
                  {showValidationErrors && !companyName && (
                    <motion.div 
                      animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 border-2 border-red-400 rounded-xl z-0 blur-[4px]"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="relative">
              <label 
                htmlFor="loanAmount" 
                className={`block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 transition-colors ${showValidationErrors && !loanAmount ? 'text-red-500' : 'text-slate-700'}`}
              >
                Requested Loan Amount (₹ Cr) *
              </label>
              <div className="relative">
                <input
                  id="loanAmount"
                  type="text"
                  value={loanAmount}
                  onChange={(e) => {
                    setLoanAmount(e.target.value);
                    if (e.target.value) setShowValidationErrors(false);
                  }}
                  className={`w-full px-4 py-2 sm:py-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white transition-all text-sm relative z-10 ${
                    showValidationErrors && !loanAmount 
                      ? 'border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                      : 'border-slate-300'
                  }`}
                  placeholder="e.g., 5.0"
                />
                <AnimatePresence>
                  {showValidationErrors && !loanAmount && (
                    <motion.div 
                      animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 border-2 border-red-400 rounded-xl z-0 blur-[4px]"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              whileHover={{ scale: 1.01 }}
              className={`bg-white rounded-2xl border-2 border-dashed p-6 sm:p-12 mb-6 transition-all duration-500 shadow-xl relative overflow-hidden group ${isDragging
                  ? 'border-emerald-500 bg-emerald-50 scale-[1.03] shadow-emerald-500/10'
                  : 'border-slate-300 hover:border-emerald-400 hover:bg-slate-50/30'
                }`}
            >
              {/* Pulsing Border Glow */}
              <motion.div 
                animate={{ 
                  opacity: isDragging ? 0.8 : [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 border-2 border-emerald-500/30 rounded-2xl pointer-events-none"
              />

              {/* Scanning Effect Overlay */}
              {uploadedFiles.length > 0 && uploadedFiles.some(f => f.status === 'validating' || f.status === 'uploading') && (
                <motion.div 
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20 pointer-events-none"
                >
                  <div className="absolute inset-0 bg-emerald-500/5 h-20 -translate-y-full" />
                </motion.div>
              )}
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl mb-4 transition-transform ${isDragging ? 'scale-110' : ''
                  }`}>
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1 sm:mb-2">
                  Drag and drop files here
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">or click to browse from your computer</p>
                <label className="inline-block">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.xlsx,.xls,.doc,.docx"
                  />
                  <span className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-blue-700 cursor-pointer inline-block transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 text-sm">
                    Select Files
                  </span>
                </label>
                <p className="text-[10px] sm:text-sm text-slate-500 mt-4 px-2">
                  Supported formats: PDF, Excel, Word (Max 50MB per file)
                </p>
              </div>
            </motion.div>


            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Uploaded Documents</h3>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Pipeline Active</span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <AnimatePresence>
                  {uploadedFiles.map((file, idx) => (
                    <motion.div 
                      key={file.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md transition-all group relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/30 group-hover:bg-emerald-500 transition-colors" />
                      
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 flex-shrink-0 ${file.status === 'complete' ? 'bg-emerald-100' :
                          file.status === 'error' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                        {file.status === 'complete' ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          >
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          </motion.div>
                        ) : file.status === 'error' ? (
                          <AlertCircle className="w-5 h-5 text-red-600 animate-bounce" />
                        ) : (
                          <FileText className="w-5 h-5 text-blue-600 animate-pulse" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-slate-900 truncate">{file.name}</p>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="ml-2 p-1 hover:bg-slate-200 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-slate-500" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-500">{file.type}</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500">{file.size}</span>
                          {file.status === 'validating' && (
                            <>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-blue-600">AI Validating...</span>
                            </>
                          )}
                          {file.status === 'complete' && (
                            <>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-emerald-600">Validated</span>
                            </>
                          )}
                        </div>
                        {(file.status === 'uploading' || file.status === 'validating') && (
                          <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-blue-600 transition-all duration-300 animate-pulse"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Required Documents Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg h-fit hover:shadow-xl transition-shadow">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
              <h3 className="text-lg font-semibold text-slate-900">Document Checklist</h3>
            </div>
            <div className="p-4 space-y-3">
              {documentTypes.map((doc, index) => {
                const isUploaded = uploadedFiles.some(f =>
                  f.type.toLowerCase().includes(doc.label.split(' ')[0].toLowerCase()) &&
                  f.status === 'complete'
                );
                const DocIcon = doc.icon;

                return (
                  <div key={index} className={`flex items-start gap-3 p-3 rounded-lg transition-all ${isUploaded ? 'bg-emerald-50' : 'hover:bg-slate-50'
                    }`}>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all ${isUploaded
                        ? 'bg-emerald-500 border-emerald-500 scale-110'
                        : 'border-slate-300'
                      }`}>
                      {isUploaded && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <DocIcon className={`w-5 h-5 mt-0.5 ${isUploaded ? 'text-emerald-600' : 'text-slate-400'
                      }`} />
                    <div className="flex-1">
                      <p className={`text-sm transition-all ${isUploaded ? 'text-slate-900 font-semibold' : 'text-slate-700'
                        }`}>
                        {doc.label}
                      </p>
                      {doc.required && (
                        <p className="text-xs text-red-600">Required</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <AnimatePresence>
              {uploadedFiles.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="p-4 border-t border-slate-200 bg-emerald-50/30"
                >
                  <motion.button
                    onClick={handleStartAnalysis}
                    disabled={isProcessing}
                    whileHover={!isProcessing ? { 
                      scale: 1.02, 
                      boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.3)" 
                    } : {}}
                    whileTap={!isProcessing ? { scale: 0.98 } : {}}
                    className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all relative overflow-hidden group ${!isProcessing
                        ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                  >
                    {!isProcessing && (
                      <motion.div 
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.8, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                      />
                    )}
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                        AI Analyzing Risk Intelligence...
                      </span>
                    ) : (
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Start AI Analysis
                      </span>
                    )}
                  </motion.button>
                  <p className="text-[10px] font-bold text-slate-500 text-center mt-3 uppercase tracking-widest">
                    AI will extract and analyze all financial indicators
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* AI Parsing Animation */}
        {isProcessing && (
          <div className="mt-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-200 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-pulse">
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-1">AI Analysis in Progress</h4>
                <p className="text-sm text-slate-600">
                  Processing documents and extracting financial insights...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}