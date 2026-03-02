# CASVE Decision Support System

A client-side web application based on the CASVE (Communication, Analysis, Synthesis, Valuing, Execution) decision-making model

## Project Structure

```
baseline-original/
└── FE/                 # Frontend (Next.js)
    ├── app/           # Next.js App Router
    ├── components/    # UI Components (Radix UI)
    ├── features/      # Feature modules (worksheet)
    └── lib/           # Utilities, types
```

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **State Management**: Context API + useReducer
- **Storage**: localStorage (client-side only)
- **Icons**: lucide-react

## Key Features

### 1. CASVE Decision-Making Worksheet (5 Steps)
- **Step 1**: Communication (external/internal cues)
- **Step 2**: Analysis (self-knowledge, occupational knowledge, metacognition)
- **Step 3**: Synthesis (option creation and selection, 2-5 alternatives)
- **Step 4**: Valuing (evaluation from multiple perspectives, priority selection)
- **Step 5**: Execution (preparation program, reality testing, employment seeking)

### 2. Manual Option Creation
- Users manually create career/decision alternatives in Step 3
- Custom profile fields support (핵심역할, 필요역량, 진입경로, etc.)
- 2-5 option selection for in-depth evaluation

### 3. Real-time Auto-save
- All inputs automatically saved to localStorage
- Session recovery on page refresh
- No backend or database required

### 4. Final Report Generation
- Comprehensive report of Steps 1-5 results
- Highlighted final decision (1st and 2nd priority)
- Clean, print-friendly layout

## Getting Started

```bash
cd FE
npm install
npm run dev
```

Application: http://localhost:3000

## Development Features

- **Korean IME Bug Fix**: Prevents duplicate saves during Korean input (`e.nativeEvent.isComposing`)
- **Auto-save**: All inputs automatically saved to localStorage in real-time
- **Step Validation**: Cannot proceed to next step without completing required fields
- **Session Management**: Unique session IDs with timestamp-based naming
- **Responsive Design**: Clean and intuitive UI with Radix UI components

## Production Deployment

```bash
cd FE
npm run build
npm start
```

Deploy to Vercel, Netlify, or any static hosting service.

## License

This project is developed for educational/research purposes.

## Contributing

Bug reports and feature suggestions are welcome via GitHub Issues.

---

**Development Period**: January 2026  
**Key Technologies**: Next.js 14, TypeScript, Tailwind CSS v4, Radix UI
