# CredVista - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm package manager

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   pnpm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   pnpm dev
   ```

3. **Open in Browser**
   Navigate to: `http://localhost:5173` (or the port shown in terminal)

---

## 🎨 Rebranding Verification Checklist

After starting the application, verify the following:

### ✅ Login Page (`/`)
- [ ] CredVista logo displayed at top center
- [ ] Tagline: "AI-Powered Corporate Credit Intelligence"
- [ ] Gradient background (slate-900 to emerald-900)
- [ ] Emerald-to-blue gradient on Sign In button
- [ ] Copyright: "© 2026 CredVista. All rights reserved."

### ✅ Sidebar (All Pages)
- [ ] CredVista logo at top (128x128px)
- [ ] Platform name: "CredVista"
- [ ] Tagline below logo: "AI-Powered Corporate Credit Intelligence"
- [ ] Dark gradient background (slate-900 to slate-800)
- [ ] Active menu items have emerald-to-blue gradient
- [ ] User profile at bottom with "Credit Manager"

### ✅ Dashboard (`/app`)
- [ ] Stats cards with rounded corners and shadows
- [ ] Emerald and blue color accents
- [ ] Charts displaying properly
- [ ] Recent applications table
- [ ] AI Risk Alerts panel

### ✅ Data Upload (`/app/upload`)
- [ ] Drag-and-drop upload area
- [ ] Emerald-to-blue gradient on buttons
- [ ] Document checklist on right side
- [ ] File validation indicators

### ✅ CAM Generator (`/app/cam/:id`)
- [ ] "CredVista - Corporate Credit Intelligence Platform" in header
- [ ] Professional report layout
- [ ] Download PDF button with gradient
- [ ] All sections properly formatted

---

## 🎯 Key Features to Test

### 1. Navigation Flow
```
Login → Dashboard → New Application → Upload Files → View Analysis → Generate CAM
```

### 2. Interactive Elements
- Hover effects on cards and buttons
- Smooth transitions and animations
- Responsive sidebar navigation
- File upload with progress indicators

### 3. Visual Design
- Consistent color palette (Deep Blue + Emerald Green)
- Rounded cards with subtle shadows
- Gradient buttons and highlights
- Professional enterprise layout

---

## 📁 Project Structure

```
Credvista/
├── public/
│   └── creditlogo.png          # Logo asset
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── MainLayout.tsx  # Sidebar + Layout
│   │   ├── pages/
│   │   │   ├── Login.tsx       # Login page
│   │   │   ├── Dashboard.tsx   # Main dashboard
│   │   │   ├── DataUpload.tsx  # File upload
│   │   │   ├── AIAnalysis.tsx  # AI analysis
│   │   │   ├── CreditScoring.tsx
│   │   │   ├── Recommendation.tsx
│   │   │   ├── CAMGenerator.tsx
│   │   │   └── ResearchAgent.tsx
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── styles/
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   └── theme.css           # Custom animations
│   └── main.tsx
├── index.html                   # Entry point with favicon
├── package.json
└── vite.config.ts
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Deep Blue (#3b82f6, #2563eb)
- **Secondary**: Emerald Green (#10b981, #059669)
- **Background**: White / Light Gray (#f8fafc, #f1f5f9)
- **Accent**: Gradient highlights (emerald-to-blue)

### Typography
- **Headings**: Bold, slate-900
- **Body**: Normal, slate-600/700
- **Labels**: Medium weight, slate-700

### Components
- **Cards**: `rounded-2xl`, `shadow-lg`, white background
- **Buttons**: Gradient with hover effects
- **Badges**: Rounded-full with status colors
- **Icons**: Lucide React, 20-24px standard size

---

## 🔧 Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist/` folder.

---

## 📱 Responsive Design

The application is designed to work on:
- Desktop (1920x1080 and above)
- Laptop (1366x768)
- Tablet (768x1024)
- Mobile (375x667 minimum)

Test responsiveness by resizing browser window or using DevTools.

---

## 🐛 Troubleshooting

### Logo Not Displaying
- Ensure `creditlogo.png` is in `/public` folder
- Check browser console for 404 errors
- Clear browser cache and reload

### Styles Not Applied
- Verify Tailwind CSS is properly configured
- Check `postcss.config.mjs` exists
- Restart dev server after config changes

### Build Errors
- Delete `node_modules` and reinstall: `npm install`
- Clear cache: `npm cache clean --force`
- Check Node.js version: `node --version` (should be v18+)

---

## 📚 Additional Resources

- **Design System**: See `DESIGN_SYSTEM.md`
- **Rebranding Summary**: See `REBRANDING_SUMMARY.md`
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Router**: https://reactrouter.com/
- **Lucide Icons**: https://lucide.dev/

---

## 🎉 Success Indicators

Your rebranding is complete when:
1. ✅ Logo appears on all pages
2. ✅ "CredVista" name is consistent throughout
3. ✅ Tagline displays correctly
4. ✅ Color palette matches design specs
5. ✅ All interactive elements work smoothly
6. ✅ No "IntelliCredit" references remain

---

**CredVista - AI-Powered Corporate Credit Intelligence**
*Banking Credit Officers' Trusted Platform*
