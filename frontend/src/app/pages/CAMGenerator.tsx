import { Link, useParams, useNavigate, useOutletContext } from "react-router";
import { FileText, Download, Printer, Mail, CheckCircle, Building2, DollarSign, TrendingUp, Shield, Menu } from "lucide-react";
import FiveCsRadarChart from "../components/FiveCsRadarChart";
import jsPDF from 'jspdf';

export function CAMGenerator() {
  const { setSidebarOpen } = useOutletContext<{ setSidebarOpen: (open: boolean) => void }>();
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15;
    const contentWidth = pageWidth - (2 * margin);
    let yPosition = margin;

    // Header
    pdf.setFillColor(16, 185, 129);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Credit Appraisal Memorandum', margin, 20);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('BankPilot - Corporate Credit Intelligence Platform', margin, 30);

    // Application ID and Date (right aligned)
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text(`Application ID: ${applicationId}`, pageWidth - margin, 20, { align: 'right' });
    pdf.text(`Generated: March 9, 2026`, pageWidth - margin, 27, { align: 'right' });

    yPosition = 50;
    pdf.setTextColor(0, 0, 0);

    // Executive Summary
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Executive Summary', margin, yPosition);
    yPosition += 10;

    pdf.setFillColor(220, 252, 231);
    pdf.rect(margin, yPosition, contentWidth, 25, 'F');
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(22, 163, 74);
    pdf.text('RECOMMENDATION: APPROVE', margin + 5, yPosition + 8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(9);
    pdf.text('AI Confidence Score: 92% | Credit Score: 82/100 | Risk Level: Low', margin + 5, yPosition + 15);
    pdf.text('Total Credit Risk Score: 73/100', margin + 5, yPosition + 21);
    yPosition += 35;

    pdf.setFontSize(10);
    const summaryText = 'Based on comprehensive AI-powered analysis, we recommend approval of a term loan facility of Rs 8.50 Crores to Aether Dynamics Pvt Ltd for capacity expansion in aerospace component manufacturing. The company demonstrates high-growth fundamentals, tier-1 global supply chain partnerships, and a robust order book.';
    const splitSummary = pdf.splitTextToSize(summaryText, contentWidth);
    pdf.text(splitSummary, margin, yPosition);
    yPosition += splitSummary.length * 5 + 10;

    // Company Overview
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Company Overview', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const companyData = [
      ['Company Name:', 'Aether Dynamics Pvt Ltd'],
      ['Industry Sector:', 'Aerospace Manufacturing'],
      ['Year of Incorporation:', '2016 (9 years)'],
      ['Annual Turnover:', 'Rs 112 Crores'],
      ['Profit After Tax:', 'Rs 24 Crores (21% margin)'],
      ['Number of Employees:', '320+']
    ];

    companyData.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'bold');
      pdf.text(label, margin, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(value, margin + 60, yPosition);
      yPosition += 7;
    });
    yPosition += 5;

    // Financial Summary
    if (yPosition > 220) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Financial Summary', margin, yPosition);
    yPosition += 10;

    // Table
    pdf.setFontSize(9);
    const tableData = [
      ['Particulars (Rs Cr)', 'FY 2024-25', 'FY 2023-24', 'Growth %'],
      ['Total Revenue', '62.0', '52.5', '+18%'],
      ['Operating Profit (EBITDA)', '18.0', '15.2', '+18%'],
      ['Profit After Tax', '14.0', '11.8', '+19%'],
      ['Total Assets', '95.0', '82.0', '+16%'],
      ['Net Worth', '45.0', '38.5', '+17%']
    ];

    const colWidths = [70, 35, 35, 30];
    const rowHeight = 8;

    tableData.forEach((row, index) => {
      if (index === 0) {
        pdf.setFillColor(241, 245, 249);
        pdf.rect(margin, yPosition, contentWidth, rowHeight, 'F');
        pdf.setFont('helvetica', 'bold');
      } else {
        pdf.setFont('helvetica', 'normal');
        if (index % 2 === 0) {
          pdf.setFillColor(249, 250, 251);
          pdf.rect(margin, yPosition, contentWidth, rowHeight, 'F');
        }
      }

      let xPos = margin + 2;
      row.forEach((cell, colIndex) => {
        pdf.text(cell, xPos, yPosition + 5);
        xPos += colWidths[colIndex];
      });
      yPosition += rowHeight;
    });
    yPosition += 10;

    // Key Ratios
    const ratios = [
      ['DSCR: 2.1x (Excellent)', 'D/E Ratio: 0.8 (Healthy)'],
      ['Current Ratio: 1.8 (Strong)', 'ROE: 31% (Excellent)']
    ];

    ratios.forEach(([left, right]) => {
      pdf.setFontSize(9);
      pdf.text(left, margin, yPosition);
      pdf.text(right, margin + 90, yPosition);
      yPosition += 7;
    });
    yPosition += 10;

    // Risk Analysis
    if (yPosition > 220) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Risk Intelligence Analysis', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Multi-Dimensional Risk Assessment', margin, yPosition);
    yPosition += 8;

    const riskCategories = [
      ['Financial Health', '90', 'Excellent'],
      ['Legal Risk', '65', 'Moderate'],
      ['Operational Risk', '70', 'Good'],
      ['Market Risk', '75', 'Good']
    ];

    pdf.setFontSize(9);
    riskCategories.forEach(([label, score, rating]) => {
      pdf.setFont('helvetica', 'normal');
      pdf.text(label, margin + 5, yPosition);
      pdf.setFont('helvetica', 'bold');
      pdf.text(score, margin + 120, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(rating, margin + 140, yPosition);

      // Progress bar
      pdf.setDrawColor(229, 231, 235);
      pdf.rect(margin + 50, yPosition - 3, 60, 4);
      pdf.setFillColor(34, 197, 94);
      pdf.rect(margin + 50, yPosition - 3, (parseInt(score) / 100) * 60, 4, 'F');

      yPosition += 8;
    });
    yPosition += 5;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Five Cs of Credit Assessment', margin, yPosition);
    yPosition += 8;

    const fiveCs = [
      ['Character', '85'],
      ['Capacity', '82'],
      ['Capital', '78'],
      ['Collateral', '75'],
      ['Conditions', '88']
    ];

    pdf.setFontSize(9);
    fiveCs.forEach(([label, score]) => {
      pdf.setFont('helvetica', 'normal');
      pdf.text(label, margin + 5, yPosition);
      pdf.setFont('helvetica', 'bold');
      pdf.text(score, margin + 150, yPosition);

      // Progress bar
      pdf.setDrawColor(229, 231, 235);
      pdf.rect(margin + 50, yPosition - 3, 90, 4);
      pdf.setFillColor(34, 197, 94);
      pdf.rect(margin + 50, yPosition - 3, (parseInt(score) / 100) * 90, 4, 'F');

      yPosition += 8;
    });
    yPosition += 10;

    // Risk Summary
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Overall Risk Rating: Low Risk', margin, yPosition);
    yPosition += 7;
    pdf.text('Total Credit Risk Score: 73/100', margin, yPosition);
    yPosition += 7;
    pdf.text('Probability of Default: 2.3%', margin, yPosition);
    yPosition += 7;
    pdf.text('AI Confidence: 92%', margin, yPosition);
    yPosition += 15;

    pdf.setTextColor(0, 0, 0);

    // Digital Intelligence & Research Agent
    if (yPosition > 220) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Digital Intelligence (Research Agent)', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Web Intelligence & News Analysis', margin, yPosition);
    yPosition += 7;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text('- TechVentures expanding in European markets (Positive Sentiment)', margin + 5, yPosition);
    yPosition += 6;
    pdf.text('- MCA Filings: Annual Returns FY24 filed successfully (Compliance-verified)', margin + 5, yPosition);
    yPosition += 6;
    pdf.text('- Sector projection: 14% CAGR for IT Services (Market Tailwinds)', margin + 5, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Corporate Governance & Promoter Check', margin, yPosition);
    yPosition += 7;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text('AI analysis of Dr. Arvind Sharma (MD) shows clear background (MCA/eCourts).', margin + 5, yPosition);
    yPosition += 6;
    pdf.text('Legal Health Score: 98/100 (No active litigation found).', margin + 5, yPosition);
    yPosition += 15;

    // Decision Explainability (XAI)
    if (yPosition > 220) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Decision Explainability (XAI)', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Top Contributors to Decision:', margin, yPosition);
    yPosition += 7;

    const contributors = [
      ['Financial Stability', '45%', 'High Positive'],
      ['Market Reputation', '25%', 'Positive'],
      ['Management Quality', '15%', 'Neutral'],
      ['Industry Outlook', '10%', 'Neutral'],
      ['Legal Scrutiny', '5%', 'Positive']
    ];

    contributors.forEach(([factor, weight, impact]) => {
      pdf.setFont('helvetica', 'bold');
      pdf.text(factor, margin + 5, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${weight} contribution - Impact: ${impact}`, margin + 60, yPosition);
      yPosition += 6;
    });
    yPosition += 10;

    // AI Recommendation
    if (yPosition > 220) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AI Recommendation', margin, yPosition);
    yPosition += 10;

    pdf.setFillColor(220, 252, 231);
    pdf.rect(margin, yPosition, contentWidth, 15, 'F');
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(22, 163, 74);
    pdf.text('APPROVED FOR SANCTION', margin + 5, yPosition + 6);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Loan Amount: Rs 5.20 Crores | Interest Rate: 9.5% p.a. | Tenure: 60 months', margin + 5, yPosition + 11);
    yPosition += 20;

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(9);
    const recommendation = 'Based on comprehensive AI-powered credit assessment, we recommend approval of the term loan facility. The company exhibits strong financial fundamentals with consistent revenue growth of 18% YoY and healthy profit margins of 22%. The debt service coverage ratio of 2.1x indicates excellent capacity to service the proposed loan. The promoters have demonstrated integrity and strong management capabilities.';
    const splitRec = pdf.splitTextToSize(recommendation, contentWidth);
    pdf.text(splitRec, margin, yPosition);
    yPosition += splitRec.length * 4 + 10;

    // Footer
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Generated by: BankPilot - Corporate Credit Intelligence Platform', margin, pageHeight - 10);
      pdf.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 20, pageHeight - 10);
      pdf.text(`Report ID: CAM-${applicationId}-20260309`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }

    const timestamp = new Date().toISOString().split('T')[0];
    pdf.save(`BankPilot_CAM_Report_${applicationId}_${timestamp}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-transparent relative pb-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Sticky Header Section */}
        <div className="sticky top-0 z-50 bg-slate-50/80 backdrop-blur-md -mx-4 px-4 py-4 sm:-mx-8 sm:px-8 sm:py-6 mb-6 sm:mb-8 border-b border-slate-200">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Link to="/app" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-900">CAM Report</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-1.5 hover:bg-white rounded-lg transition-colors border border-slate-200"
                  aria-label="Toggle Sidebar"
                >
                  <Menu className="w-5 h-5 text-slate-600" />
                </button>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Credit Appraisal Memorandum</h1>
              </div>
              <p className="text-gray-600 text-sm sm:text-base mt-1">Auto-generated professional report ready for export</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Generation Status */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">CAM Report Generated Successfully</h4>
              <p className="text-sm text-gray-600">
                Professional credit appraisal memorandum ready for review and export
              </p>
            </div>
          </div>
        </div>

        {/* CAM Document Preview */}
        <div id="cam-report" className="bg-white rounded-2xl shadow-lg max-w-7xl mx-auto">
          {/* Document Header */}
          <div className="p-6 sm:p-8 border-b-4 border-emerald-600 bg-gradient-to-r from-emerald-50 to-white">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
                    <img src="/bankpilot-logo.jpg" alt="BankPilot Logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Credit Appraisal Memorandum</h2>
                    <p className="text-sm text-gray-600">BankPilot - Corporate Credit Intelligence Platform</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Application ID</p>
                <p className="font-mono font-semibold text-gray-900">{applicationId}</p>
                <p className="text-xs text-gray-500 mt-1">Generated: March 9, 2026</p>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-600 rounded"></div>
              Executive Summary
            </h3>
            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-700">RECOMMENDATION: APPROVE</span>
              </div>
              <p className="text-sm text-gray-700">
                AI Confidence Score: <strong>94%</strong> | Credit Score: <strong>82/100</strong> | Risk Level: <strong>Low</strong>
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Based on comprehensive AI-powered analysis, we recommend approval of a term loan facility of
              <strong> ₹8.50 Crores</strong> to <strong>Aether Dynamics Pvt Ltd</strong> for capacity expansion.
              The company demonstrates high-growth fundamentals, tier-1 global supply chain partnerships (Airbus/Boeing),
              and a robust order book. The credit assessment shows superior profile strength in Character and Capacity.
            </p>
          </div>

          {/* Company Overview */}
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-600 rounded"></div>
              Company Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Company Name</p>
                    <p className="font-medium text-gray-900">Aether Dynamics Pvt Ltd</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Industry Sector</p>
                  <p className="font-medium text-gray-900">Aerospace Components</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Year of Incorporation</p>
                  <p className="font-medium text-gray-900">2016 (9 years)</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Registered Office</p>
                  <p className="font-medium text-gray-900">SEZ Pune, Maharashtra</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Annual Turnover (FY 2024-25)</p>
                    <p className="font-medium text-gray-900">₹112 Crores</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Profit After Tax</p>
                  <p className="font-medium text-gray-900">₹24 Crores (21% margin)</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Number of Employees</p>
                  <p className="font-medium text-gray-900">320+</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Key Clients</p>
                  <p className="font-medium text-gray-900">Boeing, Airbus, HAL</p>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-600 rounded"></div>
              Financial Summary
            </h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Particulars (₹ Cr)</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">FY 2024-25</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">FY 2023-24</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">Growth %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-gray-900">Total Revenue</td>
                    <td className="px-4 py-3 text-right text-gray-900">62.0</td>
                    <td className="px-4 py-3 text-right text-gray-900">52.5</td>
                    <td className="px-4 py-3 text-right text-green-600 font-medium">+18%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">Operating Profit (EBITDA)</td>
                    <td className="px-4 py-3 text-right text-gray-900">18.0</td>
                    <td className="px-4 py-3 text-right text-gray-900">15.2</td>
                    <td className="px-4 py-3 text-right text-green-600 font-medium">+18%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-900">Profit After Tax</td>
                    <td className="px-4 py-3 text-right text-gray-900">14.0</td>
                    <td className="px-4 py-3 text-right text-gray-900">11.8</td>
                    <td className="px-4 py-3 text-right text-green-600 font-medium">+19%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">Total Assets</td>
                    <td className="px-4 py-3 text-right text-gray-900">95.0</td>
                    <td className="px-4 py-3 text-right text-gray-900">82.0</td>
                    <td className="px-4 py-3 text-right text-green-600 font-medium">+16%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-900">Net Worth</td>
                    <td className="px-4 py-3 text-right text-gray-900">45.0</td>
                    <td className="px-4 py-3 text-right text-gray-900">38.5</td>
                    <td className="px-4 py-3 text-right text-green-600 font-medium">+17%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">DSCR</p>
                <p className="text-xl font-bold text-gray-900">2.1x</p>
                <p className="text-xs text-green-600">Excellent</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">D/E Ratio</p>
                <p className="text-xl font-bold text-gray-900">0.8</p>
                <p className="text-xs text-green-600">Healthy</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Current Ratio</p>
                <p className="text-xl font-bold text-gray-900">1.8</p>
                <p className="text-xs text-green-600">Strong</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">ROE</p>
                <p className="text-xl font-bold text-gray-900">31%</p>
                <p className="text-xs text-green-600">Excellent</p>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-600 rounded"></div>
              Risk Analysis
            </h3>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Five Cs of Credit Assessment
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="h-[250px] sm:h-[350px]">
                  <FiveCsRadarChart
                    scores={{
                      character: 85,
                      capacity: 82,
                      capital: 78,
                      collateral: 75,
                      conditions: 88
                    }}
                    title="Five Cs Credit Profile"
                  />
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Qualitative Highlights</p>
                    <ul className="space-y-2">
                      <li className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Character: Validated promoter integrity check
                      </li>
                      <li className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Capacity: 2.1x DSCR debt servicing capability
                      </li>
                      <li className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Conditions: Favorable market tailwinds in IT sector
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">AI Synthesis</p>
                    <p className="text-[11px] font-medium text-emerald-700 leading-relaxed">
                      Credit profile shows balanced strength across all core pillars with minimal outlier risk detected in collateral coverage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-semibold text-gray-900 mb-1">Overall Risk Rating</p>
                <p className="text-2xl font-bold text-green-700">Low Risk</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-gray-900 mb-1">Probability of Default</p>
                <p className="text-2xl font-bold text-blue-700">2.3%</p>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm font-semibold text-gray-900 mb-1">AI Confidence</p>
                <p className="text-2xl font-bold text-purple-700">94%</p>
              </div>
            </div>
          </div>

          {/* Digital Intelligence Findings */}
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-600 rounded"></div>
              Digital Intelligence (Web Research)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-emerald-700 uppercase mb-3 px-2 py-0.5 bg-emerald-100 rounded inline-block">Web Intelligence Nodes</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">• Aether Dynamics expanding precision labs (Positive Signal)</li>
                  <li className="flex items-start gap-2">• MCA Filings: Audited balance sheet filed (Compliance-verified)</li>
                  <li className="flex items-start gap-2">• Sector pulse: High demand for local aerospace parts (Tailwind)</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-blue-700 uppercase mb-3 px-2 py-0.5 bg-blue-100 rounded inline-block">Promoter & Legal Scrutiny</h4>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900">Dr. Arvind Sharma (MD)</p>
                  <p className="text-xs text-gray-600">Clean background verified via MCA & eCourts. No political affiliations found.</p>
                  <div className="mt-3 p-2 bg-[#1E293B] text-white rounded-lg flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Legal Health Score</span>
                    <span className="text-sm font-black">98 <span className="text-[10px] opacity-60">/ 100</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decision Explainability (XAI) */}
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-600 rounded"></div>
              Decision Explainability (XAI)
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <p className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-widest">Neural Weight Contribution</p>
              <div className="space-y-3">
                {[
                  { factor: 'Financial Stability', weight: '45%', impact: 'High Positive' },
                  { factor: 'Market Reputation', weight: '25%', impact: 'Positive' },
                  { factor: 'Management Quality', weight: '15%', impact: 'Neutral' },
                  { factor: 'Industry Outlook', weight: '10%', impact: 'Neutral' },
                  { factor: 'Legal Scrutiny', weight: '5%', impact: 'Positive' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.factor}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-500">{item.weight}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter ${item.impact.includes('Positive') ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                        }`}>
                        {item.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-600 rounded"></div>
              AI Recommendation
            </h3>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-500 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">APPROVED FOR SANCTION</h4>
                  <p className="text-sm text-gray-600">Loan Amount: ₹8.50 Crores | Interest Rate: 10.5% p.a. | Tenure: 48 months</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                Based on comprehensive AI-powered credit assessment, we recommend <strong>approval</strong> of the
                term loan facility. The company exhibits strong financial fundamentals with consistent revenue growth
                of 18% YoY and healthy profit margins of 22%. The debt service coverage ratio of 2.1x indicates
                excellent capacity to service the proposed loan.
              </p>
              <p>
                The promoters have demonstrated integrity and strong management capabilities. The company operates in
                a growing IT services sector with favorable industry outlook. Recent contract wins, including a
                ₹15 Cr government contract, strengthen the revenue visibility.
              </p>
              <p>
                Collateral coverage is adequate with commercial property valued at ₹35 Cr providing security coverage
                of 1.4x. The loan-to-value ratio of 68% is within acceptable limits. Risk mitigation measures including
                quarterly financial reporting, insurance coverage, and personal guarantees are recommended.
              </p>
            </div>

            <div className="mt-6 p-4 bg-emerald-50 border-l-4 border-emerald-600 rounded-r-lg">
              <p className="text-xs text-gray-500 mb-1">Credit Officer Observations (Primary Insights)</p>
              <div className="text-sm text-gray-700 bg-white/50 p-4 rounded-xl border border-emerald-100 mb-4">
                <p><strong>Observation:</strong> Factory operating at 40% capacity due to planned upgrade. Promoter appears transparent about margin compression. AI has adjusted the risk profile by +3.2 points for transparency.</p>
              </div>
              <p className="text-xs text-gray-500 mb-1">Final AI Decision Engine Note</p>
              <p className="text-sm text-gray-700">
                This CAM has been auto-generated by BankPilot AI platform. All data has been extracted and
                verified from submitted documents, MCA filings, and web intelligence nodes.
              </p>
            </div>
          </div>

          {/* Document Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div>
                <p>Generated by: BankPilot - Corporate Credit Intelligence Platform</p>
                <p>Report ID: CAM-{applicationId}-20260309</p>
              </div>
              <div className="text-right">
                <p>Date: March 9, 2026</p>
                <p>Confidential Document</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 sm:mt-8">
          <button
            onClick={() => navigate('/app')}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleDownloadPDF}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download PDF Report
          </button>
        </div>
      </div>
    </div>
  );
}
