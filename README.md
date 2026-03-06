# Vidya AI - Rural Academic Empowerment Platform

An Academic Empowerment module for rural Indian students, built for the AI for Bharat hackathon.

## Features

- **Multi-language Support**: English, Hindi, and Marathi
- **Student Profile Creation**: Capture education level, stream, career goals, and interests
- **AI-Powered Guidance**: Personalized study plans and recommendations
- **Free Course Recommendations**: Curated courses from NPTEL, Swayam, and other platforms
- **Scholarship Information**: Relevant scholarships with eligibility criteria
- **Internship Matching**: Connect students with startup opportunities
- **12-Month Roadmap**: Personalized learning journey

## Tech Stack

- React 19
- Vite 8
- Motion (Framer Motion) for animations
- Inline CSS styling with Indian color palette (Saffron, Green, Navy)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd vidya-ai
```

2. Install dependencies (already done):
```bash
npm install
```

### Running the App

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
vidya-ai/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## Features Breakdown

### Step 1: Profile Creation
Students enter their name, village, education level, stream, career goal, and interests.

### Step 2: AI Guidance
Personalized study plan with:
- Custom study advice
- Identified strengths
- Priority focus areas
- Daily routine suggestions
- Motivational message

### Step 3: Free Courses
Curated courses from:
- NPTEL / Swayam
- IGNOU Open
- Tally Education
- Startup India
- And more

### Step 4: Scholarships
Information about:
- PM YASASVI Scholarship
- NSP State Merit Scholarship
- Pragati Scholarship (Girls)
- Ishan Uday (NE States)

### Step 5: Internships
Startup opportunities in:
- Agriculture
- Healthcare
- Business
- Education

### Step 6: 12-Month Roadmap
Personalized milestones for the student's learning journey.

## Demo Notice

This is a demo application built for the AI for Bharat Hackathon. It is not official academic advice.

## License

This project is part of the AI for Bharat Hackathon submission.
