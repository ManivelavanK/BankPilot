# CredVista - Corporate Credit Intelligence Platform

## Project Overview
CredVista is a modern AI-powered fintech platform designed for bank credit managers to analyze corporate loan applications. The platform features intelligent document processing, risk assessment, and automated CAM (Credit Appraisal Memorandum) report generation.

## Recent Enhancements

### 1. Complete Rebranding
- ✅ Replaced all instances of "IntelliCredit" with "CredVista"
- ✅ Updated tagline to "Corporate Credit Intelligence Platform"
- ✅ Integrated logo from `src/styles/creditlogo.png` in:
  - Sidebar header
  - Login page
  - Navigation bar

### 2. Modern Fintech Design Theme
**Color Palette:**
- Primary: Deep Blue (#3b82f6)
- Secondary: Emerald Green (#10b981)
- Background: Light Gray / White with gradient overlays
- Accent: Soft gradient highlights (emerald to blue)

**Design Style:**
- Dark sidebar with gradient background (slate-900 to emerald-900)
- Clean, professional enterprise UI
- Rounded cards with soft shadows
- Modern typography
- Smooth transitions and animations

### 3. UI Component Enhancements

#### Sidebar (MainLayout.tsx)
- Dark gradient background with emerald and blue accents
- Logo display with tagline
- Hover effects with scale animations
- Active state with emerald-to-blue gradient
- User profile section at bottom

#### Dashboard (Dashboard.tsx)
- Background decorative elements (animated gradient blobs)
- Enhanced stat cards with hover animations
- Financial trend charts with modern styling
- Risk distribution pie chart
- Recent applications table with company icons
- AI risk alerts panel
- Smooth transitions and hover effects

#### Data Upload (DataUpload.tsx)
- Animated background decorations
- Enhanced drag-and-drop area with scale effects
- Document type icons (GST, Bank Statements, etc.)
- Animated upload progress bars with gradient
- Document checklist with icons and animations
- Green checkmarks with scale animation on completion
- AI parsing status indicator

#### Login Page (Login.tsx)
- Dark gradient background (slate-900 to emerald-900)
- Animated background blobs
- Logo integration
- Modern glassmorphism card design
- Emerald accent colors
- Hover effects on buttons

### 4. Animations & Micro-interactions
Added custom animations in `theme.css`:
- Fade-in animations
- Slide-in transitions
- Scale effects on hover
- Pulse animations for loading states
- Smooth color transitions
- Card hover effects with lift
- Button scale on hover
- Progress bar animations

### 5. CAM Report Generator (CAMGenerator.tsx)
**Features:**
- Professional report layout
- Structured sections:
  - Executive Summary
  - Company Overview
  - Financial Summary with tables
  - Risk Analysis with Five Cs of Credit
  - AI Recommendation
- Export functionality with working PDF download
- Print-friendly styling

**PDF Download Implementation:**
- Integrated jsPDF and html2canvas libraries
- Generates multi-page PDF documents
- Handles long reports with automatic pagination
- Includes loading states during generation
- Error handling with user feedback
- Filename format: `CredVista_CAM_Report_[ID]_[DATE].pdf`

### 6. Visual Enhancements

#### Financial Data Visualization
- Revenue trend line charts
- Risk score gauges
- Financial ratio cards
- Credit rating indicators
- Application trend bar charts
- Risk distribution pie charts

#### Document Icons
- GST Filings: FileSpreadsheet icon
- Bank Statements: FileBarChart icon
- Annual Reports: FileText icon
- Financial Statements: FileBarChart icon
- Director KYC: Shield icon
- Collateral Documents: FileCheck icon

#### Background Decorations
- Subtle gradient blobs on all pages
- Animated pulse effects
- Financial graph patterns
- Data network aesthetics

### 7. Technical Improvements

**Dependencies Added:**
```json
{
  "jspdf": "latest",
  "html2canvas": "latest"
}
```

**Custom CSS Animations:**
- fadeIn, slideIn, scaleIn keyframes
- Custom scrollbar styling
- Gradient text effects
- Shimmer loading effects
- Print media queries for CAM reports

**Color Scheme Updates:**
- Primary buttons: emerald-600 to blue-600 gradient
- Hover states: emerald-700 to blue-700
- Active states: emerald-500 to blue-600
- Shadows: emerald-500/30 opacity

### 8. Accessibility & UX
- Smooth transitions on all interactive elements
- Clear visual feedback on hover
- Loading states for async operations
- Error handling with user-friendly messages
- Keyboard navigation support
- Focus states with emerald ring
- High contrast text for readability

## File Structure
```
src/
├── app/
│   ├── components/
│   │   ├── MainLayout.tsx (✅ Updated)
│   │   └── ui/ (shadcn components)
│   └── pages/
│       ├── Dashboard.tsx (✅ Updated)
│       ├── DataUpload.tsx (✅ Updated)
│       ├── AIAnalysis.tsx
│       ├── CAMGenerator.tsx (✅ Updated with PDF)
│       └── Login.tsx (✅ Updated)
├── styles/
│   ├── creditlogo.png (✅ Integrated)
│   ├── index.css
│   ├── theme.css (✅ Enhanced)
│   └── tailwind.css
└── main.tsx
```

## Running the Project

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## Key Features

### 1. Dashboard
- Real-time application statistics
- Monthly trend analysis
- Risk distribution visualization
- Recent company evaluations
- AI-powered risk alerts

### 2. New Application Upload
- Drag-and-drop file upload
- Multi-document support
- Real-time validation
- AI parsing indicators
- Document checklist tracking

### 3. AI Analysis
- Automated document processing
- Financial trend extraction
- Risk assessment
- Compliance checking
- Sector analysis

### 4. CAM Report Generation
- Professional report layout
- Comprehensive financial analysis
- Risk scoring with Five Cs
- One-click PDF download
- Print-ready format

## Design Principles
1. **Modern Fintech Aesthetic**: Clean, professional, enterprise-grade
2. **User-Centric**: Intuitive navigation and clear visual hierarchy
3. **Performance**: Smooth animations without compromising speed
4. **Accessibility**: WCAG compliant with proper contrast ratios
5. **Responsive**: Works seamlessly across different screen sizes

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements
- Real-time collaboration features
- Advanced analytics dashboard
- Machine learning model integration
- Multi-language support
- Mobile app version

## Credits
Built with:
- React 18.3.1
- TypeScript
- Vite 6.3.5
- Tailwind CSS 4.1.12
- Recharts 2.15.2
- jsPDF & html2canvas
- Lucide React Icons
- Radix UI Components

---

**CredVista** - Transforming Corporate Credit Intelligence with AI
