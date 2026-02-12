```
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
```

## Project Overview

**jijinguzhi** is a React + TypeScript + Vite application for tracking Chinese fund investments. It allows users to add funds by code, view real-time estimated values, and monitor changes.

## Development Commands

### Core Scripts
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview production build locally
- `npm run check` - Run TypeScript check without building

### Development Workflow
1. Start dev server: `npm run dev`
2. Lint code: `npm run lint`
3. Build for production: `npm run build`
4. Preview production build: `npm run preview`

## Architecture

### Tech Stack
- **React 18.3** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Zustand** - State management
- **Lucide React** - Icon library

### Key Features
- Fund search and tracking
- Real-time estimated value updates
- Auto-refresh functionality
- Responsive grid layout
- Dark/light theme support
- Local storage persistence

### API Integration
The application fetches fund data from a third-party API:
- Proxy configured at `/api/fund` (target: `http://fundgz.1234567.com.cn/js`)
- JSONP response format parsing
- Caching mechanism with expiry

### High-Level Structure
```
src/
├── components/        # Reusable UI components
│   ├── Layout.tsx    # Root layout wrapper
│   ├── Header.tsx    # Navigation header
│   ├── FundCard.tsx  # Individual fund card
│   └── AddFundForm.tsx # Form to add new funds
├── hooks/            # Custom React hooks
│   ├── useFundData.ts  # Fund data fetching and management
│   └── useTheme.ts    # Theme switching
├── pages/            # Route components
│   ├── Home.tsx      # Main fund tracking page
│   └── Settings.tsx  # Application settings
├── utils/            # Utility functions
│   ├── api.ts        # API integration
│   ├── storage.ts    # Local storage operations
│   └── cn.ts         # Tailwind class merging
├── types/            # TypeScript type definitions
├── App.tsx           # Root component with routing
├── main.tsx          # Entry point
└── index.css         # Global styles
```

### State Management
- **Local storage** for persisting fund codes and settings
- **useFundData hook** for managing fund data lifecycle
- **No global state management library** (Zustand is installed but not actively used)

### Build Configuration
- Vite with React plugin
- TypeScript paths alias configured (@/ → src/)
- Source maps hidden in production
- Proxy setup for API calls
