import { Link, useParams, useOutletContext } from "react-router";
import { Search, Newspaper, Users, Scale, TrendingUp, ExternalLink, AlertCircle, CheckCircle, ArrowRight, Menu } from "lucide-react";

export function ResearchAgent() {
  const { setSidebarOpen } = useOutletContext<{ setSidebarOpen: (open: boolean) => void }>();
  const { applicationId } = useParams();

  const newsArticles = [
    {
      title: "TechVentures wins ₹15 Cr government contract for digital infrastructure",
      source: "Business Standard",
      date: "2026-02-28",
      sentiment: "positive",
      relevance: "high"
    },
    {
      title: "IT services sector shows strong Q4 performance",
      source: "Economic Times",
      date: "2026-02-15",
      sentiment: "positive",
      relevance: "medium"
    },
    {
      title: "TechVentures expands operations to Bangalore and Hyderabad",
      source: "Mint",
      date: "2026-01-20",
      sentiment: "positive",
      relevance: "high"
    }
  ];

  const promoterInfo = [
    {
      name: "Rajesh Kumar",
      designation: "Managing Director & CEO",
      experience: "20+ years in IT industry",
      education: "IIT Delhi, MBA from IIM Ahmedabad",
      directorships: "3 active directorships",
      status: "Clean record"
    },
    {
      name: "Priya Sharma",
      designation: "Director & CFO",
      experience: "15 years in finance",
      education: "CA, CFA",
      directorships: "2 active directorships",
      status: "Clean record"
    }
  ];

  const litigationData = [
    {
      type: "Civil",
      case: "Property dispute with vendor",
      status: "Ongoing",
      amount: "₹2.5 Lakhs",
      risk: "Low",
      details: "Minor contract dispute, expected resolution in 3 months"
    }
  ];

  const industryTrends = [
    {
      trend: "Digital Transformation Acceleration",
      impact: "Positive",
      description: "Increased demand for IT services as companies accelerate digital initiatives"
    },
    {
      trend: "Government IT Spending",
      impact: "Positive",
      description: "Government increasing budget for digital infrastructure by 25%"
    },
    {
      trend: "Talent Availability",
      impact: "Neutral",
      description: "Moderate competition for skilled tech talent in tier-2 cities"
    }
  ];

  const timelineEvents = [
    { date: "2026-03-01", event: "Government contract award announcement", type: "positive" },
    { date: "2026-02-15", event: "Q4 results show 18% revenue growth", type: "positive" },
    { date: "2026-01-20", event: "New office expansion announced", type: "positive" },
    { date: "2025-12-10", event: "Minor civil litigation filed", type: "neutral" },
    { date: "2025-11-05", event: "Annual audit completed - clean report", type: "positive" },
  ];

  return (
    <div className="pb-8">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md -mx-4 px-4 py-4 sm:-mx-8 sm:px-8 sm:py-6 mb-6 sm:mb-8 border-b border-slate-200">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <Link to="/app" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          <span>/</span>
          <Link to={`/app/analysis/${applicationId}`} className="hover:text-blue-600 transition-colors">AI Analysis</Link>
          <span>/</span>
          <span className="text-gray-900">Research Agent</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 hover:bg-white rounded-lg transition-colors border border-slate-200"
                aria-label="Toggle Sidebar"
              >
                <Menu className="w-5 h-5 text-slate-600" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Agent Insights</h1>
            </div>
            <p className="text-gray-600">TechVentures Pvt Ltd • Comprehensive background research</p>
          </div>
          <Link
            to={`/app/scoring/${applicationId}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            Continue to Credit Scoring
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Research Status */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <Search className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">AI Research Agent Analysis Complete</h4>
            <p className="text-sm text-gray-600">
              Scanned 150+ news sources • Analyzed 25 industry reports • Verified promoter backgrounds
            </p>
          </div>
        </div>
      </div>

      {/* News Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Newspaper className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Company News & Media Coverage</h3>
              <p className="text-sm text-gray-600">Recent news articles and mentions</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {newsArticles.map((article, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 flex-1 pr-4">{article.title}</h4>
                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">{article.source}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{article.date}</span>
                <span className="text-gray-400">•</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${article.sentiment === 'positive' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                  {article.sentiment}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${article.relevance === 'high' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                  {article.relevance} relevance
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promoter Background */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Promoter Background Verification</h3>
              <p className="text-sm text-gray-600">Key management personnel analysis</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {promoterInfo.map((promoter, index) => (
            <div key={index} className="p-5 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{promoter.name}</h4>
                  <p className="text-sm text-blue-600">{promoter.designation}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {promoter.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Experience</p>
                  <p className="text-sm text-gray-900">{promoter.experience}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Education</p>
                  <p className="text-sm text-gray-900">{promoter.education}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Other Directorships</p>
                  <p className="text-sm text-gray-900">{promoter.directorships}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Litigation Risks */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Scale className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Litigation Risk Assessment</h3>
              <p className="text-sm text-gray-600">Legal proceedings and compliance status</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          {litigationData.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-gray-600">No significant litigation risks detected</p>
            </div>
          ) : (
            <div className="space-y-4">
              {litigationData.map((litigation, index) => (
                <div key={index} className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{litigation.type} - {litigation.case}</h4>
                        <p className="text-sm text-gray-600 mt-1">{litigation.details}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {litigation.risk} Risk
                    </span>
                  </div>
                  <div className="flex gap-6 mt-3 ml-8">
                    <div>
                      <span className="text-xs text-gray-500">Status: </span>
                      <span className="text-sm text-gray-900">{litigation.status}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Amount: </span>
                      <span className="text-sm text-gray-900">{litigation.amount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Industry Trends */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Industry Trends & Market Analysis</h3>
              <p className="text-sm text-gray-600">Sector outlook and competitive positioning</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {industryTrends.map((trend, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{trend.trend}</h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trend.impact === 'Positive' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                  {trend.impact}
                </span>
              </div>
              <p className="text-sm text-gray-600">{trend.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Timeline of Key Events</h3>
          <p className="text-sm text-gray-600">Chronological view of significant developments</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${event.type === 'positive' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  {index < timelineEvents.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <p className="text-xs text-gray-500 mb-1">{event.date}</p>
                  <p className="text-sm text-gray-900">{event.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
