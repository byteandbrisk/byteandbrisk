# Contributing to Byte&Brisk Website

Thank you for considering contributing to the Byte&Brisk website! This document provides guidelines and best practices for contributing.

## 🚀 Getting Started

1. **Fork the repository** and clone your fork
2. **Install dependencies**: `npm install`
3. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes** following our coding standards
5. **Test thoroughly** before submitting
6. **Submit a Pull Request** with a clear description

## 📋 Development Workflow

### Branch Naming Convention

- `feature/` - New features (e.g., `feature/contact-form`)
- `fix/` - Bug fixes (e.g., `fix/mobile-menu`)
- `refactor/` - Code refactoring (e.g., `refactor/button-component`)
- `docs/` - Documentation updates (e.g., `docs/readme-update`)
- `style/` - CSS/styling changes (e.g., `style/hero-animation`)

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

**Examples:**
```bash
git commit -m "feat(hero): add kinetic headline animation"
git commit -m "fix(button): resolve hover state on mobile"
git commit -m "docs(readme): update installation instructions"
```

## 🎨 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` types - use `unknown` if type is truly unknown
- Use type inference where appropriate

```typescript
// ✅ Good
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

// ❌ Bad
interface ButtonProps {
  variant?: string;
  size?: any;
  onClick?: Function;
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused (Single Responsibility Principle)
- Use path aliases for imports (`@components`, `@hooks`, etc.)
- Extract reusable logic into custom hooks

```typescript
// ✅ Good
import { Button } from '@components/common/Button';
import { useMediaQuery } from '@hooks/useMediaQuery';

export function MyComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  // ...
}

// ❌ Bad
import { Button } from '../../components/common/Button';
```

### Styling

- Use Tailwind utility classes for styling
- Follow the design system tokens
- Use the `cn()` utility for conditional classes
- Avoid inline styles unless absolutely necessary

```typescript
// ✅ Good
<div className={cn(
  "glass-surface rounded-xl p-8",
  isActive && "glass-surface-strong"
)} />

// ❌ Bad
<div style={{ background: 'rgba(255,255,255,0.14)', padding: '32px' }} />
```

### Animations

- Use Motion (Framer Motion) for animations
- Respect `useReducedMotion()` preference
- Keep animations subtle and purposeful
- Use design system duration tokens

```typescript
// ✅ Good
const shouldReduceMotion = useReducedMotion();

<motion.div
  animate={shouldReduceMotion ? {} : {
    y: [0, -10, 0]
  }}
  transition={{ duration: 0.42 }}
/>

// ❌ Bad
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 5 }} // Too long!
/>
```

## 🧪 Testing

Before submitting a PR:

1. **Test in multiple browsers**:
   - Chrome
   - Firefox
   - Safari
   - Edge

2. **Test responsive behavior**:
   - Desktop (1440px)
   - Tablet (1024px)
   - Mobile (390px)

3. **Test accessibility**:
   - Keyboard navigation
   - Screen reader compatibility
   - Reduced motion preference

4. **Run linter**:
   ```bash
   npm run lint
   ```

5. **Build successfully**:
   ```bash
   npm run build
   ```

## 📝 Pull Request Guidelines

### PR Title

Use the same format as commit messages:
```
feat(section): add new testimonials section
```

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Screenshots (if applicable)
Add screenshots for visual changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Commented complex code sections
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tested on multiple browsers
- [ ] Responsive design verified
- [ ] Accessibility checked
```

## 🎯 Design System Guidelines

### Colors

Always use design system color variables:
- Primary: `#2D6AE3` (Azure)
- Accent: `#1CD6A0` (Mint)
- Refer to `DESIGN_SYSTEM.md` for complete palette

### Typography

Use semantic HTML and design system classes:
```tsx
<h1>Primary Headline</h1>        // 44px, bold
<h2>Section Header</h2>            // 32px, bold
<h3>Subsection Title</h3>          // 24px, semibold
<p className="body-large">...</p>  // 18px
<p>Standard body text</p>          // 16px
<p className="caption">...</p>     // 13px
```

### Spacing

Use the 4px base rhythm:
- Small: `spacing-2` (8px), `spacing-3` (12px)
- Medium: `spacing-4` (16px), `spacing-6` (24px)
- Large: `spacing-8` (32px), `spacing-12` (48px)

### Motion

Use standardized durations:
- Quick: `220ms` (t1)
- Standard: `420ms` (t2)
- Slow: `800ms` (t3)
- Ambient: `1400ms` (t4)

## ♿ Accessibility Requirements

All contributions must meet WCAG 2.1 AA standards:

- **Contrast**: Minimum 4.5:1 for text
- **Focus States**: Visible focus indicators on all interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Alt Text**: Descriptive alt text for all images
- **ARIA Labels**: Proper ARIA attributes where needed
- **Semantic HTML**: Use appropriate HTML5 elements

## 🚫 What Not to Do

- ❌ Don't commit `node_modules/` or `dist/` directories
- ❌ Don't commit `.env` files (use `.env.example`)
- ❌ Don't use inline styles except for dynamic values
- ❌ Don't bypass ESLint rules without good reason
- ❌ Don't introduce breaking changes without discussion
- ❌ Don't add heavy dependencies without justification

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Motion Documentation](https://www.framer.com/motion/)
- [Radix UI Components](https://www.radix-ui.com/)

## 💬 Questions?

If you have questions:
- Open an issue for discussion
- Reach out on our community channels
- Email: dev@bytebrisk.com

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Byte&Brisk! 🚀

