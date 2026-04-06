<div align="center">
  <h1>🚀 Figma to Code AI</h1>
  <p><strong>A modern, AI-powered web application that turns Figma UI screenshots into clean, production-ready React & Next.js code.</strong></p>
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/AI-Google_Gemini-orange" alt="Gemini Vision" />
</div>

<br />

## 🌟 Overview

Tired of manually translating high-fidelity mockups into front-end code? **Figma to Code AI** automates the heavy lifting. By uploading one or more Figma screenshots, our AI pipeline (powered by Google Gemini Vision) analyzes your layout, colors, typography, components, and spacing to generate clean, modular, and developer-friendly code using Tailwind CSS. 

## ✨ Features

- **🖼️ Intelligent Screenshot Analysis:** Detects layouts, components, cards, typography hierarchies, and spacing nuances.
- **⚛️ Multi-Framework Support:** Generate code in standard **React** or **Next.js**.
- **🎨 Tailwind CSS Ready:** Outputs modern semantic code leveraging Tailwind utility classes without bloated inline styles.
- **👀 Live Preview Environment:** Instantly see the generated components working in a sandboxed preview tab.
- **📦 Expandable Architecture:** Detailed component layer trees and design token extraction modules.

---

## 🏗️ Technical Architecture

This application is built with a decoupled API approach inside a Next.js App Router monolith, ensuring rapid development and seamless deployments.

```mermaid
graph TD
    %% Client Tier
    subgraph Client [Frontend UI]
        Upload[Upload Zone]
        Store[Zustand State]
        Prev[Live Preview]
        Code[Syntax Highlight Panel]
    end

    %% Next.js API Tier
    subgraph Backend [Next.js API Routes]
        AnalyzeAPI[/api/analyze]
        GenerateAPI[/api/generate]
    end

    %% AI Tier
    subgraph AI [Google Cloud AI]
        Vision[Gemini 2.0 Flash Vision]
        LLM[Gemini 2.0 Flash CodeGen]
    end

    %% Data Flow
    Upload -- "1. POST Image" --> AnalyzeAPI
    AnalyzeAPI -- "2. Analyze structure" --> Vision
    Vision -- "3. Structured JSON" --> AnalyzeAPI
    AnalyzeAPI -- "4. Return mapping" --> Store
    
    Store -- "5. POST Context" --> GenerateAPI
    GenerateAPI -- "6. Generate TSX" --> LLM
    LLM -- "7. Output files" --> GenerateAPI
    GenerateAPI -- "8. Return Code" --> Store
    
    Store --> Code
    Store --> Prev
```

### Tech Stack
- **Frontend Framework:** Next.js 14 App Router, React 18
- **Styling:** Tailwind CSS + custom design system variables
- **State Management:** React hooks / Zustand (Global)
- **AI Engine:** `@google/generative-ai` (Gemini 2.0 Flash for Vision + Code Gen)
- **UI & Icons:** Lucide React, Framer Motion, Radix Primitives

### Component Workflow

1. **Upload Phase:** `react-dropzone` processes files locally and creates thumbnails.
2. **Analysis Pipeline (API):** Image is POSTed to the backend route and sent to Google Gemini Vision. Gemini outputs structured JSON (Layout trees, colors, components).
3. **Generation Pipeline (API):** Structured JSON + prompt configuration is sent back to an LLM to generate TSX application code.
4. **Output Rendering:** Component is returned, syntax highlighted using `react-syntax-highlighter`, and rendered inside the preview block.

---

## 📂 Folder Structure

```bash
figma-to-code/
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── layout.tsx            # Global layout (Sidebar + Theme provider)
│   │   ├── page.tsx              # Main dashboard workspace view
│   │   ├── globals.css           # Tailwind base + custom design token vars
│   │   └── api/                  # Backend Next.js API Routes (TODO)
│   │       ├── analyze/route.ts  # Vision processing endpoint
│   │       └── generate/route.ts # Code generation endpoint
│   │
│   ├── components/               # React Components
│   │   ├── ui/                   # Shared primitive components (Buttons, inputs)
│   │   ├── sidebar/              # Left navigation sidebar
│   │   ├── upload/               # Drag & Drop upload zone logic
│   │   ├── code-panel/           # Code highlighted output & Tabs component
│   │   └── generated/            # Output folder for generated components
│   │
│   ├── lib/                      # Utilities and configuration
│   │   ├── ai/                   # Prompts and LLM pipeline wrappers (TODO)
│   │   └── utils.ts              # Tailwind merge & utility functions
│   │
│   ├── hooks/                    # Custom application state hooks
│   └── types/                    # Global TypeScript interfaces
├── public/                       # Static assets
└── tailwind.config.ts            # Tailwind UI configuration 
```

---

## 🚀 Getting Started

### 1. Requirements

- Node.js version 20.x or higher
- npm, yarn, or pnpm
- Google Gemini API Key (or OpenAI key if refactored)

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/PriyankaSDaida/FigmaUI.git
cd FigmaUI
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root of your project:

```bash
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

### 4. Running Locally

Boot up the local dev server:

```bash
npm run dev
```

Navigate to `http://localhost:3000` to interact with the dashboard.

---

## 🔮 Future Roadmap

- [ ] **Figma API Integration:** Directly import Figma components without screenshots.
- [ ] **Multiple Screen Context:** Relate multiple screenshot views together into a routed flow.
- [ ] **Design System Export:** Generate a full `tokens.css` or Storybook component suite.
- [ ] **Accessibility Refiner:** A distinct "improve code" loop focused heavily on ARIA labels and keyboard friendly interactions.

---

<div align="center">
  <p>Built with 🩵 for designers and developers.</p>
</div>
