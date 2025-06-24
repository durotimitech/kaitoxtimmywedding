# Wedding Website

A beautiful wedding website built with Next.js, ShadCN UI, TypeScript, and Styled Components.

## Features

- 🎨 **ShadCN UI** - Beautiful, accessible UI components
- 💅 **Styled Components** - CSS-in-JS styling with theme support
- 🔷 **TypeScript** - Type-safe development
- ⚡ **Next.js 15** - React framework with App Router
- 🎯 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first approach

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Styled Components + Tailwind CSS
- **UI Components**: ShadCN UI
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
│   ├── ui/             # ShadCN UI components
│   └── providers/      # Context providers
├── lib/                # Utility functions and configurations
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## Customization

### Styled Components Theme

The styled-components theme is configured in `src/lib/styled-theme.ts`. You can customize:

- Colors
- Spacing
- Breakpoints
- Border radius

### ShadCN Components

Add new ShadCN components using:

```bash
npx shadcn@latest add [component-name]
```

### Tailwind Configuration

Tailwind CSS can be customized in `tailwind.config.js`.

## Deployment

The project can be deployed on any platform that supports Next.js:

- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)
- [Heroku](https://heroku.com)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [ShadCN UI Documentation](https://ui.shadcn.com)
- [Styled Components Documentation](https://styled-components.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
