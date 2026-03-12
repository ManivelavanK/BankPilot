# CredVista Design System

## Brand Identity

### Logo
- **File**: `/public/creditlogo.png`
- **Usage**: Sidebar (128x128px), Login (80x80px), Favicon

### Tagline
**"AI-Powered Corporate Credit Intelligence"**

---

## Color Palette

### Primary Colors
```css
/* Deep Blue */
--blue-600: #3b82f6
--blue-700: #2563eb
--blue-50: #eff6ff
--blue-100: #dbeafe
```

### Secondary Colors
```css
/* Emerald Green */
--emerald-400: #34d399
--emerald-500: #10b981
--emerald-600: #059669
--emerald-700: #047857
--emerald-50: #ecfdf5
--emerald-100: #d1fae5
```

### Neutral Colors
```css
/* Slate Gray */
--slate-50: #f8fafc
--slate-100: #f1f5f9
--slate-200: #e2e8f0
--slate-300: #cbd5e1
--slate-400: #94a3b8
--slate-500: #64748b
--slate-600: #475569
--slate-700: #334155
--slate-800: #1e293b
--slate-900: #0f172a
```

### Accent Colors
```css
/* Status Colors */
--green-600: #16a34a (Success)
--red-600: #dc2626 (Error/High Risk)
--amber-600: #d97706 (Warning/Medium Risk)
--purple-600: #9333ea (Info)
```

---

## Typography

### Font Family
- **Primary**: System font stack (Helvetica, Arial, sans-serif)
- **Monospace**: For IDs and codes

### Font Sizes
```css
--text-xs: 0.75rem (12px)
--text-sm: 0.875rem (14px)
--text-base: 1rem (16px)
--text-lg: 1.125rem (18px)
--text-xl: 1.25rem (20px)
--text-2xl: 1.5rem (24px)
--text-3xl: 1.875rem (30px)
--text-4xl: 2.25rem (36px)
```

### Font Weights
```css
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

---

## Spacing & Layout

### Border Radius
```css
--radius-lg: 0.5rem (8px)
--radius-xl: 0.75rem (12px)
--radius-2xl: 1rem (16px)
--radius-full: 9999px (circular)
```

### Shadows
```css
/* Card Shadow */
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Large Shadow */
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

/* XL Shadow */
box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

/* Emerald Glow */
box-shadow: 0 10px 15px -3px rgb(16 185 129 / 0.3);
```

---

## Components

### Buttons

#### Primary Button
```jsx
className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105"
```

#### Secondary Button
```jsx
className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
```

### Cards
```jsx
className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow"
```

### Sidebar Navigation
```jsx
// Active State
className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg shadow-emerald-500/30"

// Inactive State
className="text-slate-300 hover:bg-slate-800 hover:text-white"
```

### Status Badges
```jsx
// Low Risk
className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-medium"

// Medium Risk
className="bg-yellow-100 text-yellow-700 px-2.5 py-0.5 rounded-full text-xs font-medium"

// High Risk
className="bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full text-xs font-medium"
```

---

## Gradients

### Background Gradients
```jsx
// Main Content Area
className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20"

// Sidebar
className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"

// Login Background
className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900"
```

### Button Gradients
```jsx
// Primary Action
className="bg-gradient-to-r from-emerald-600 to-blue-600"

// Success State
className="bg-gradient-to-r from-green-600 to-emerald-600"
```

---

## Animations

### Transitions
```css
transition-all duration-300 ease-in-out
```

### Hover Effects
```jsx
// Card Lift
className="hover:-translate-y-1 transition-transform"

// Scale
className="hover:scale-105 transition-transform"

// Icon Scale
className="group-hover:scale-110 transition-transform"
```

### Loading States
```jsx
// Pulse
className="animate-pulse"

// Spin
className="animate-spin"
```

---

## Icons

### Icon Library
**Lucide React** - Modern, consistent icon set

### Common Icons
- `LayoutDashboard` - Dashboard
- `Upload` - File upload
- `FileText` - Documents
- `TrendingUp` - Analytics
- `AlertTriangle` - Warnings
- `CheckCircle` - Success
- `Building2` - Company
- `DollarSign` - Financial
- `Shield` - Security

### Icon Sizes
```jsx
className="w-4 h-4" // Small (16px)
className="w-5 h-5" // Medium (20px)
className="w-6 h-6" // Large (24px)
className="w-8 h-8" // XL (32px)
```

---

## Responsive Design

### Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Grid Layouts
```jsx
// Dashboard Stats
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"

// Content Sections
className="grid grid-cols-1 lg:grid-cols-3 gap-6"
```

---

## Best Practices

1. **Consistency**: Use the defined color palette and spacing system
2. **Accessibility**: Maintain proper contrast ratios (WCAG AA)
3. **Performance**: Optimize images and use lazy loading
4. **Responsiveness**: Test on multiple screen sizes
5. **Animations**: Keep transitions smooth and purposeful
6. **Typography**: Maintain clear hierarchy and readability

---

## Usage Examples

### Dashboard Card
```jsx
<div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
  <div className="flex items-center gap-3">
    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100">
      <TrendingUp className="w-6 h-6 text-emerald-600" />
    </div>
    <div>
      <h3 className="text-3xl font-bold text-slate-900">124</h3>
      <p className="text-sm text-slate-600">Total Applications</p>
    </div>
  </div>
</div>
```

### Alert Box
```jsx
<div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200">
  <div className="flex items-center gap-4">
    <CheckCircle className="w-6 h-6 text-emerald-600" />
    <div>
      <h4 className="font-semibold text-slate-900">Success</h4>
      <p className="text-sm text-slate-600">Operation completed successfully</p>
    </div>
  </div>
</div>
```

---

**CredVista Design System v1.0**
*Last Updated: March 9, 2026*
