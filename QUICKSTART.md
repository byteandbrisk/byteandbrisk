# 🚀 Quick Start Guide

Get the Byte&Brisk website running in under 5 minutes!

## Prerequisites

Make sure you have installed:
- Node.js >= 18.0.0
- npm >= 9.0.0

Check versions:
```bash
node --version
npm --version
```

## Installation

```bash
# 1. Navigate to the frontend directory
cd front-end

# 2. Install dependencies (this may take a few minutes)
npm install

# 3. Start the development server
npm run dev
```

The website will open automatically at **http://localhost:3000** 🎉

## What You'll See

The homepage includes 7 animated sections:

1. **Hero** - Kinetic headlines with "Building fast" rotation
2. **Capabilities** - 4 service cards with unique reveals
3. **Track Record** - Project showcase with cascade animation
4. **Showcase** - Portfolio grid with animated borders
5. **Process** - Timeline with pulse animations
6. **CTA Band** - Call-to-action with count-up metrics
7. **Footer** - Enhanced footer with social links

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Common Issues

### Port Already in Use
If port 3000 is busy, Vite will automatically try the next available port.

### Module Not Found
Delete `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Type Errors
Ensure TypeScript is up to date:
```bash
npm install typescript@latest
```

## Next Steps

- 📖 Read the full [README.md](./README.md)
- 🎨 Check the [DESIGN_SYSTEM.md](../src/DESIGN_SYSTEM.md)
- 🎬 Review [GLASS_2.0_MOTION_SPEC.md](../src/GLASS_2.0_MOTION_SPEC.md)
- 🤝 See [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute

## Pro Tips

### Enable Hot Reload
Hot Module Replacement (HMR) is enabled by default. Save any file to see instant updates!

### Use Path Aliases
Import using clean paths:
```typescript
import { Button } from '@components/common/Button';
import { useMediaQuery } from '@hooks/useMediaQuery';
```

### Debugging
- Use browser DevTools (F12)
- Check the console for errors
- Source maps are enabled in development

## Need Help?

- 📧 Email: dev@bytebrisk.com
- 🐛 Issues: Open a GitHub issue
- 💬 Discord: Join our community

---

**Happy Coding!** 🎉
