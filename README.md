# WriteFlow - Collaborative Lexical Editor

A premium, collaborative rich text writing platform built with Lexical, Velt, Next.js, and modern web technologies. Features real-time multi-user presence, live cursors, inline lexical commenting, and CRDT-powered synchronization.

![Next.js](https://img.shields.io/badge/Next.js-13.5.1-black)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-blue)
![Lexical](https://img.shields.io/badge/Lexical-0.40-purple)
![Velt](https://img.shields.io/badge/Velt-4.7.13-green)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

### Rich Text Editor (Lexical)

- **Lexical Powered** - Facebook's extensible text editor framework for high performance and accessibility.
- **Floating Bubble Menu** - Contextual formatting tools (Bold, Italic, Link, Comment) that appear on text selection.
- **Comprehensive Toolbar** - Full-featured toolbar for headings, lists, quotes, and advanced formatting.
- **Default Content Generation** - Automatically initializes with a professional article template.

### Real-Time Collaboration (Velt)

- **Presence** - See who else is viewing the document in real time via the navbar.
- **Live Cursors** - Track other users' mouse movements and text insertions across the document.
- **Lexical Inline Comments** - Industry-standard commenting experience integrated directly into the Lexical tree.
- **User Switching (Demo Mode)** - Quickly toggle between `User 1` and `User 2` via the navbar to test collaboration instantly.
- **Comment Counter** - Live telemetry in the navbar showing the total number of active threads.

### 📄 CRDT & MCP Integration

This project leverages cutting-edge Velt technologies for a "no-conflict" experience:

- **CRDT (Conflict-free Replicated Data Types)**: Built-in Velt synchronization ensures that multiple users can edit the same paragraph simultaneously. Changes are merged mathematically at the data layer, preventing overrides and ensuring eventual consistency without a complex backend.
- **Velt Agent Skills (MCP)**: This project was scaffolded and is maintained using **Velt Agent Skills**. This Model Context Protocol (MCP) integration allows AI coding assistants to understand Velt's best practices, handle JWT authentication wiring, and manage complex editor plugins automatically.

### UI / UX

- **Aesthetic Design** - Premium Look & Feel with vibrant gradients and modern typography.
- **Dark / Light Mode** - Full support for system-synced or manual theme toggling.
- **Responsive Navigation** - Fully functional mobile sheet menu for small-screen productivity.
- **shadcn/ui Components** - Accessible, high-quality UI components powered by Radix primitives.

## Modern Tech Stack

- **Next.js 13** - App Router architecture with optimized client/server boundaries.
- **TypeScript** - Strict type safety for complex editor logic.
- **Velt SDK** - The engine for presence, comments, and CRDT data syncing.
- **@veltdev/lexical-velt-comments** - Specialized adapter for Lexical node synchronization.
- **Lucide React** - Clean and consistent iconography.

## Getting Started

### Prerequisites

- Node.js 18+
- Velt API Key & Auth Token (available at [console.velt.dev](https://console.velt.dev))

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd writeflow-lexical-velt
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables in `.env.local`:

```bash
NEXT_PUBLIC_VELT_API_KEY=your_public_key_here
VELT_AUTH_TOKEN=your_auth_token_here
```

4. Start the development server:

```bash
npm run dev
```

## Project Structure

```
├── app/
│   ├── api/velt/token/
│   │   └── route.ts              # JWT Token generation endpoint for Velt
│   ├── userAuth/                 # User Context & Demo User Switching
│   │   ├── AppUserContext.tsx    # Provider for application user state
│   │   └── useAppUser.tsx        # Hook for accessing/switching users
│   ├── globals.css               # Global styles, Tailwind base & Velt highlighters
│   ├── layout.tsx                # Root layout wrapping AppUserProvider & ThemeProvider
│   └── page.tsx                  # Landing page initializing VeltProvider & Editor
├── components/                   # Application Components
│   ├── editor/                   # Lexical Editor Implementation
│   │   ├── plugins/              # Lexical Plugins (Toolbar, BubbleMenu, VeltComments)
│   │   │   ├── bubble-menu-plugin.tsx
│   │   │   ├── toolbar-plugin.tsx
│   │   │   └── velt-comments-plugin.tsx
│   │   └── lexical-editor.tsx    # Lexical configuration & node registry
│   ├── velt/                     # Velt Integration & Customization
│   │   ├── ui-customization/     # Custom Velt UI styling and component overrides
│   │   ├── VeltCollaboration.tsx # Main feature assembly (Presence, Cursors, Comments)
│   │   ├── VeltInitializeDoc.tsx # Document identity initialization
│   │   ├── VeltInitializeUser.tsx# User authentication & provider setup
│   │   └── VeltTools.tsx         # Velt utility components
│   ├── ui/                       # shadcn/ui shared components (Card, Button, etc.)
│   ├── navbar.tsx                # Main Header with Presence, Comments badge & User Switch
│   ├── theme-provider.tsx        # Next-themes implementation
│   └── theme-toggle.tsx          # Light/Dark mode switch
├── lib/                          # Helper functions (cn utility)
├── public/                       # Static assets (Velt icons and graphics)
├── package.json                  # Project dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
├── components.json               # shadcn/ui configuration
└── tailwind.config.ts            # Tailwind CSS configuration
```

## 🔗 Velt Integration Details

### Lexical Velt Plugin

The editor uses `@veltdev/lexical-velt-comments` to map Lexical nodes to Velt annotations:

```tsx
import { CommentNode, renderComments, addComment } from "@veltdev/lexical-velt-comments";

// 1. Add to Lexical nodes array
const editorConfig = { nodes: [..., CommentNode] };

// 2. Render comments via plugin
useEffect(() => {
  renderComments({ editor, commentAnnotations: annotations });
}, [annotations]);
```

### Authentication Flow

We use a secure **Backend-to-Backend (B2B)** token generation pattern:

1. Client calls `/api/velt/token` with user info.
2. Server validates session and calls Velt API with `VELT_AUTH_TOKEN`.
3. Velt returns a signed JWT for the client session.

## 🎯 How to Use

1. **Annotate**: Highlight any text in the editor; click the 💬 icon in the floating menu.
2. **Collaborate**: Open the app in two windows. Set one to `User 1` and the other to `User 2` using the Navbar dropdown.
3. **Move**: Watch your mouse cursor trail appear in the other window in real-time.

## 📚 Resources

- [Velt Lexical Docs](https://docs.velt.dev/async-collaboration/comments/setup/lexical)
- [Lexical Framework](https://lexical.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
