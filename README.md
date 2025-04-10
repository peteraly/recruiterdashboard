# Resume Review Dashboard

A modern web application for managing job descriptions and candidate resumes with a structured review process.

## Features

- **Dashboard Overview**
  - Quick statistics and metrics
  - Recent candidates and active job descriptions
  - Easy navigation to different sections

- **Job Description Management**
  - Create and edit job descriptions
  - Define requirements and responsibilities
  - Set must-have and nice-to-have criteria
  - Specify salary ranges

- **Candidate Review System**
  - Two-phase review process
  - Quick assessment (60-90 seconds)
  - Detailed evaluation (5-7 minutes)
  - Final classification
  - Red flag and green flag tracking

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd resume-review-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
resume-review-dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── CandidateReview.tsx
│   │   └── JobDescriptionManager.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── index.tsx
├── public/
└── package.json
```

## Review Process

### Phase 1: Quick Assessment (60-90 seconds)
- Education requirements
- Experience requirements
- Technical requirements
- Career stability

### Phase 2: Detailed Evaluation (5-7 minutes)
- Experience assessment
- Skills evaluation
- Knowledge verification
- Work style analysis
- Red flag identification
- Green flag tracking

### Phase 3: Final Classification
- Overall score calculation
- Final notes and recommendations
- Classification (Strong Match, Good Potential, Possible Fit, Not a Match)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- React Router for navigation
- TypeScript for type safety
