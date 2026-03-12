import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { DataUpload } from "./pages/DataUpload";
import { AIAnalysis } from "./pages/AIAnalysis";
import { ResearchAgent } from "./pages/ResearchAgent";
import { CreditScoring } from "./pages/CreditScoring";
import { Recommendation } from "./pages/Recommendation";
import { CAMGenerator } from "./pages/CAMGenerator";
import { AIRiskIntelligence } from "./pages/AIRiskIntelligence";
import { FraudDetectionLab } from "./pages/FraudDetectionLab";
import { CompanyIntelligence } from "./pages/CompanyIntelligence";
import { AILoanSimulator } from "./pages/AILoanSimulator";
import { PortfolioRiskMonitor } from "./pages/PortfolioRiskMonitor";
import { DocumentIntelligence } from "./pages/DocumentIntelligence";
import { CreditPolicyEngine } from "./pages/CreditPolicyEngine";
import { AICopilot } from "./pages/AICopilot";
import { IndustryBenchmark } from "./pages/IndustryBenchmark";
import { AICreditAnalyst } from "./pages/AICreditAnalyst";
import { MainLayout } from "./components/MainLayout";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: LandingPage,
    },
    {
      path: "/login",
      Component: Login,
    },
    {
      path: "/app",
      Component: MainLayout,
      children: [
        { index: true, Component: Dashboard },
        { path: "upload", Component: DataUpload },
        { path: "risk-intelligence", Component: AIAnalysis },
        { path: "company-intelligence", Component: CompanyIntelligence },
        { path: "loan-simulator", Component: AILoanSimulator },
        { path: "portfolio-risk", Component: PortfolioRiskMonitor },
        { path: "credit-policy", Component: CreditPolicyEngine },
        { path: "industry-benchmark", Component: IndustryBenchmark },
        { path: "ai-copilot", Component: AICopilot },
        { path: "ai-analyst", Component: AICreditAnalyst },
        { path: "cam-report", Component: CAMGenerator },
        { path: "risk-intelligence/:applicationId", Component: AIAnalysis },
        { path: "research/:applicationId", Component: ResearchAgent },
        { path: "scoring/:applicationId", Component: CreditScoring },
        { path: "recommendation/:applicationId", Component: Recommendation },
        { path: "cam/:applicationId", Component: CAMGenerator },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);