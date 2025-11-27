# Byte&Brisk Company Website

> **Building fast. Thinking deep.**

A modern, production-ready company website built with React, TypeScript, and Tailwind CSS, featuring the Frosted Radiance Glass 2.0 design system.

![Byte&Brisk](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.3-06B6D4)

---

## ✨ Features

### 🎨 Design System
- **Glass 2.0 Upgrade**: Advanced glassmorphism with multiple opacity levels and backdrop blur effects
- **Motion-Driven**: Sophisticated animations powered by Framer Motion
- **Fully Responsive**: Optimized for Desktop (1440px), Tablet (1024px), and Mobile (390px)
- **Accessibility First**: WCAG 2.1 AA compliant, reduced motion support, proper focus states

### 🚀 Technical Highlights
- **TypeScript**: Full type safety across the entire codebase
- **Vite**: Lightning-fast development and optimized production builds
- **Code Splitting**: Automatic chunk splitting for optimal performance
- **Path Aliases**: Clean imports with `@components`, `@hooks`, `@utils`, etc.
- **ESLint**: Configured for React and TypeScript best practices

### 📦 Page Sections
1. **Hero Kinetic** - Animated headline with rotating "Building fast" and gravity-drop "Thinking deep"
2. **Capabilities 2×2** - Four service cards with unique quadrant reveal animations
3. **Track Record** - Project showcase with cascade reveal and glow effects
4. **Showcase Refined** - Portfolio grid with animated borders on hover
5. **Process Timeline** - Four-step process with pulse animations traveling the rail
6. **CTA Band Enhanced** - Call-to-action with breathing shadow and count-up metrics
7. **Footer Enhanced** - Complete footer with grain drift and social links

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18.3.1 |
| **Language** | TypeScript 5.7.3 |
| **Build Tool** | Vite 6.3.5 |
| **Styling** | Tailwind CSS 4.1.3 |
| **Animations** | Motion (Framer Motion) 11.15.0 |
| **UI Components** | Radix UI |
| **Icons** | Lucide React |
| **Utilities** | clsx, tailwind-merge |

---

## 📂 Project Structure

```
front-end/
├── src/
│   ├── components/
│   │   ├── sections/         # Page sections
│   │   │   ├── HeroKinetic.tsx
│   │   │   ├── Capabilities2x2.tsx
│   │   │   ├── TrackRecord.tsx
│   │   │   ├── ShowcaseRefined.tsx
│   │   │   ├── ProcessTimeline.tsx
│   │   │   ├── CTABandEnhanced.tsx
│   │   │   └── FooterEnhanced.tsx
│   │   ├── common/           # Reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   └── IconCircle.tsx
│   │   └── ui/               # shadcn/ui components (40+)
│   ├── pages/
│   │   └── HomePage.tsx      # Main page composition
│   ├── hooks/                # Custom React hooks
│   │   └── useMediaQuery.ts
│   ├── utils/                # Utility functions
│   │   └── cn.ts
│   ├── styles/
│   │   └── globals.css       # Design tokens & utilities
│   ├── assets/               # Static assets
│   ├── App.tsx               # Root component
│   └── main.tsx              # Entry point
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to frontend directory
cd front-end

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Server will start at http://localhost:3000
```

The development server includes:
- ⚡ Hot Module Replacement (HMR)
- 🔍 Source maps for debugging
- 🎯 Fast refresh for instant updates

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

Build optimizations include:
- ✅ TypeScript compilation
- ✅ Code minification
- ✅ Automatic code splitting
- ✅ Asset optimization
- ✅ Source maps generation

### Linting

```bash
# Run ESLint
npm run lint
```

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Azure** | `#2D6AE3` | Primary brand color |
| **Mint** | `#1CD6A0` | Accent color |
| **Iris** | `#7B61FF` | Secondary accent |
| **Ink** | `#0F172A` | Headlines |
| **Graphite** | `#334155` | Body text |
| **Mist** | `#94A3B8` | Captions |
| **Base** | `#F5F8FA` | Background |

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

| Style | Size | Usage |
|-------|------|-------|
| Display | 56px | Hero headlines |
| H1 | 44px | Primary headlines |
| H2 | 32px | Section headers |
| H3 | 24px | Card titles |
| Body Large | 18px | Lead paragraphs |
| Body Medium | 16px | Standard text |
| Caption | 13px | Metadata |

### Glass Effects

```css
/* Glass Surface Variants */
.glass-surface         /* Standard (14% opacity, 20px blur) */
.glass-surface-strong  /* Strong (18% opacity, 22px blur) */
.glass-surface-subtle  /* Subtle (8% opacity, 18px blur) */
```

### Motion Tokens

| Duration | Value | Usage |
|----------|-------|-------|
| t1 | 220ms | Quick transitions |
| t2 | 420ms | Standard animations |
| t3 | 800ms | Slower reveals |
| t4 | 1400ms | Ambient loops |

---

## 🎬 Animation Highlights

### Hero Kinetic
- **Ignite Sweep**: Radial glow on page load (900ms)
- **"Building fast"**: Z-axis rotation (0° → 90° → -8° → 0°)
- **"Thinking deep"**: Gravity drop with overshoot settle
- **Glass Chips**: Orbital motion with mouse parallax

### Capabilities 2×2
- **Q1 (Top-Left)**: Slide from left
- **Q2 (Top-Right)**: Scale + blur fade
- **Q3 (Bottom-Left)**: Clip-reveal (mask expands)
- **Q4 (Bottom-Right)**: Elevation pop + icon tilt

### Process Timeline
- **Pulse Animation**: Light travels the rail between steps
- **Count-Up**: Numbers animate from 00 → 01, 02, 03, 04
- **Content Reveal**: Synced mask reveal with pulse arrival

### CTA Band
- **Breathing Shadow**: 6s continuous elevation loop
- **Count-Up Metrics**: Animated numbers (48h, 2-4wk, 100%)
- **Ambient Particles**: 20 floating particles with random delays

---

## ♿ Accessibility

- ✅ **WCAG 2.1 AA Compliant**: All text meets 4.5:1 contrast ratio
- ✅ **Keyboard Navigation**: Full keyboard support with visible focus states
- ✅ **Screen Readers**: Semantic HTML with proper ARIA labels
- ✅ **Reduced Motion**: Respects `prefers-reduced-motion` preference
- ✅ **Focus Management**: 2px Azure focus rings with proper offset

---

## 🔧 Configuration

### Path Aliases

Configured in `vite.config.ts` and `tsconfig.json`:

```typescript
import { Button } from '@components/common/Button';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { cn } from '@utils/cn';
```

### Environment Variables

Create a `.env` file for environment-specific configuration:

```bash
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your-analytics-id
```

---

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM rendering
- `motion` - Animation library (Framer Motion fork)

### UI Components
- `@radix-ui/*` - Headless accessible components
- `lucide-react` - Icon library
- `tailwindcss` - Utility-first CSS framework

### Utilities
- `clsx` - Conditional className utility
- `tailwind-merge` - Merge Tailwind classes
- `class-variance-authority` - Component variants

### Dev Dependencies
- `typescript` - Type safety
- `vite` - Build tool
- `eslint` - Code linting
- `@vitejs/plugin-react-swc` - Fast React refresh

---

## 🚢 Deployment

### Recommended Platforms

- **Vercel**: Zero-config deployment for Vite projects
- **Netlify**: Automatic builds from Git
- **AWS Amplify**: Full-stack hosting
- **GitHub Pages**: Static site hosting

### Build Command

```bash
npm run build
```

### Output Directory

```bash
dist/
```

---

## 📝 License

This project uses components from:
- [shadcn/ui](https://ui.shadcn.com/) - MIT License
- [Unsplash](https://unsplash.com) - Unsplash License

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Contact

**Byte&Brisk**  
Building fast. Thinking deep.

- Website: [https://bytebrisk.com](https://bytebrisk.com)
- Email: hello@bytebrisk.com
- Twitter: [@bytebrisk](https://twitter.com/bytebrisk)
- LinkedIn: [Byte&Brisk](https://linkedin.com/company/bytebrisk)

---

## 🙏 Acknowledgments

- Design system inspired by modern glassmorphism trends
- Animation patterns influenced by premium SaaS landing pages
- Component architecture following React best practices
- Generated with [Figma Make](https://www.figma.com)

---

<div align="center">

**Built with ❤️ by Byte&Brisk**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

