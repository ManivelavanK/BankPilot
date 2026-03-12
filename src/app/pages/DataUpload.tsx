import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, FileText, CheckCircle2, X, FileCheck, AlertCircle, FileSpreadsheet, FileBarChart, Shield } from "lucide-react";

type UploadedFile = {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'uploading' | 'validating' | 'complete' | 'error';
  progress: number;
};

export function DataUpload() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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
      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        type: getFileType(file.name),
        size: formatFileSize(file.size),
        status: 'uploading',
        progress: 0,
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      let progress = 0;
      const uploadInterval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setUploadedFiles(prev =>
            prev.map(f =>
              f.id === fileId ? { ...f, progress, status: progress === 100 ? 'validating' : 'uploading' } : f
            )
          );
        }
        if (progress === 100) {
          clearInterval(uploadInterval);
          // Simulate validation
          setTimeout(() => {
            setUploadedFiles(prev =>
              prev.map(f => (f.id === fileId ? { ...f, status: 'complete' } : f))
            );
          }, 1500);
        }
      }, 200);
    });
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

  const handleStartAnalysis = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/app/analysis/APP001');
    }, 2000);
  };

  const canStartAnalysis = uploadedFiles.length >= 4 && companyName && loanAmount;

  return (
    <div className="p-8 bg-transparent relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">New Loan Application</h1>
          <p className="text-slate-600">Upload company documents for AI-powered credit analysis</p>
        </div>

        {/* Company Details Form */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg mb-6 hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Application Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-2">
                Company Name *
              </label>
              <input
                id="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white transition-all"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label htmlFor="loanAmount" className="block text-sm font-medium text-slate-700 mb-2">
                Requested Loan Amount (₹ Cr) *
              </label>
              <input
                id="loanAmount"
                type="text"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white transition-all"
                placeholder="e.g., 5.0"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            {/* Drag and Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`bg-white rounded-2xl border-2 border-dashed p-12 mb-6 transition-all shadow-lg hover:shadow-xl ${isDragging
                  ? 'border-emerald-500 bg-emerald-50 scale-105'
                  : 'border-slate-300 hover:border-emerald-400'
                }`}
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl mb-4 transition-transform ${isDragging ? 'scale-110' : ''
                  }`}>
                  <Upload className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Drag and drop files here
                </h3>
                <p className="text-slate-600 mb-4">or click to browse from your computer</p>
                <label className="inline-block">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.xlsx,.xls,.doc,.docx"
                  />
                  <span className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-blue-700 cursor-pointer inline-block transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105">
                    Select Files
                  </span>
                </label>
                <p className="text-sm text-slate-500 mt-3">
                  Supported formats: PDF, Excel, Word (Max 50MB per file)
                </p>
              </div>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                  <h3 className="text-lg font-semibold text-slate-900">Uploaded Documents</h3>
                </div>
                <div className="p-4 space-y-3">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${file.status === 'complete' ? 'bg-emerald-100' :
                          file.status === 'error' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                        {file.status === 'complete' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : file.status === 'error' ? (
                          <AlertCircle className="w-5 h-5 text-red-600" />
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
                    </div>
                  ))}
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

            <div className="p-4 border-t border-slate-200">
              <button
                onClick={handleStartAnalysis}
                disabled={!canStartAnalysis || isProcessing}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${canStartAnalysis && !isProcessing
                    ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-700 hover:to-blue-700 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Starting AI Analysis...
                  </span>
                ) : (
                  'Start AI Analysis'
                )}
              </button>
              <p className="text-xs text-slate-500 text-center mt-3">
                AI will extract and analyze all financial data
              </p>
            </div>
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