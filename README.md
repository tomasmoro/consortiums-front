# CondoFlow — Property Management Platform

A production-ready frontend monorepo for condominium management, built with Turborepo, Next.js 14 (App Router), TypeScript, TailwindCSS, Zustand, React Hook Form + Zod.

## Stack

| Tool | Purpose |
|------|---------|
| [Turborepo](https://turbo.build/) | Monorepo build system |
| [Next.js 14](https://nextjs.org/) | Web app (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Strict mode throughout |
| [TailwindCSS](https://tailwindcss.com/) | Styling |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Forms & validation |
| [Lucide React](https://lucide.dev/) | Icons |

## Project Structure

```
/
├── apps/
│   └── web/              # Next.js 14 App Router application
├── packages/
│   ├── types/            # Shared TypeScript domain types
│   ├── utils/            # Shared utility functions (formatters)
│   ├── config/           # Shared ESLint + TSConfig presets
│   └── ui/               # Shared UI component library
```

## Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

The web app runs at [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Type-check

```bash
npm run type-check
```

## Demo Accounts

| Role | Email | Password |
|------|-------|---------|
| Admin | admin@condoflow.com | any |
| Resident | resident@condoflow.com | any |
| Technician | tech@condoflow.com | any |
| Super Admin | superadmin@condoflow.com | any |

## Role Permissions

| Feature | superadmin | admin | resident | technician |
|---------|-----------|-------|----------|-----------|
| Dashboard | Full | Full | View | View |
| Maintenance | Full | Full | View+Create | View+Edit |
| Incidents | Full | Full | View+Create | View |
| Finance | Full | Full | View | None |
| Access Control | Full | Full | View+Create | View |
| Communication | Full | Full | View+Create | View |

## Architecture Decisions

- **Feature-based structure**: Each domain feature is self-contained under `apps/web/features/`
- **Mock API layer**: `apps/web/lib/api/` provides async mock functions with realistic delays
- **Role-based UI**: `useFeatureFlags()` hook + `config/features.ts` permission map
- **Atomic Design**: Components organized as atoms → molecules → organisms