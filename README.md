# 🚀 PlacementAI - Next-Gen AI-Powered Career & Placement Preparation Platform

![PlacementAI Banner](https://img.shields.io/badge/PlacementAI-v1.0.0-6366f1?style=for-the-badge&logo=react&logoColor=white)
![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-11.4-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)

**PlacementAI** is a comprehensive, AI-driven placement preparation suite designed to empower students and job seekers with tools for resume building, ATS optimization, technical coding practice, aptitude tests, HR interview simulation, and company-specific preparation tracks.

---

## ✨ Features & Modules

### 🔐 1. Authentication & Security (Firebase Integration)
* **Email & Password Authentication**: Secure user registration and login powered by Firebase Auth.
* **Google OAuth Sign-In**: One-click social authentication.
* **Password Reset**: Automated recovery email flow.
* **Persistent Sessions**: Real-time user session persistence via `onAuthStateChanged`.
* **User Profiles**: Automatic user document creation in Cloud Firestore.

### 📄 2. Smart Resume Builder & ATS Scanner
* **Interactive Resume Builder**: Real-time multi-section resume builder with live preview.
* **ATS Score Analyzer**: Industry-standard ATS resume parser scoring keyword match, formatting, and impact metrics.
* **PDF Export & Download**: Export production-ready formatted resumes.

### 🧠 3. Aptitude & Logical Reasoning Module
* Topic-wise practice for **Quantitative Aptitude**, **Logical Reasoning**, and **Verbal Ability**.
* Timed quiz simulation with instant score breakdowns and explanations.

### 💻 4. Technical Coding & System Design
* **Data Structures & Algorithms (DSA)** practice tracks.
* System design and core CS subjects (OS, DBMS, Computer Networks).
* Interactive code editor sandbox with test cases.

### 🗣️ 5. HR & Behavioral Interview Simulator
* AI-generated mock HR questions with STAR technique guidance.
* Real-time answer evaluation and constructive feedback.

### 🏢 6. Company-Specific Prep Tracks
* Tailored preparation guides for top IT service & product companies (e.g. TCS NQT, Infosys, Wipro, Amazon, Google).
* Exam pattern breakdowns, syllabus checklists, and previous year question sets.

### 📊 7. Progress Tracking & Analytics Dashboard
* Visual performance charts, skill matrix radar graphs, and daily streak tracking.
* Comprehensive readiness index to evaluate overall placement preparedness.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Build Tool & Bundler** | [Vite 8](https://vitejs.dev/) |
| **Backend & Database** | [Firebase 11](https://firebase.google.com/) (Auth & Cloud Firestore) |
| **UI Styling** | Custom CSS3 (Dark Glassmorphism Design System) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 📁 Project Structure

```
Placement_AI/
├── public/                 # Static public assets & PWA manifest
├── src/
│   ├── assets/             # Images & static media
│   ├── components/         # Reusable UI components (Navbar, Sidebar, Modals, PWABanner)
│   ├── data/               # Mock data & prep question banks
│   ├── modules/            # Core application feature modules
│   │   ├── AnalyticsModule.jsx
│   │   ├── AptitudeModule.jsx
│   │   ├── ATSAnalysisModule.jsx
│   │   ├── AuthModal.jsx
│   │   ├── CompanyPrepModule.jsx
│   │   ├── DashboardModule.jsx
│   │   ├── HRInterviewModule.jsx
│   │   ├── LandingPage.jsx
│   │   ├── ProfileModule.jsx
│   │   ├── ProgressModule.jsx
│   │   ├── ResumeBuilderModule.jsx
│   │   ├── SettingsModule.jsx
│   │   └── TechnicalModule.jsx
│   ├── App.jsx             # Main App layout & Firebase Auth observer
│   ├── firebase.js          # Firebase configuration & exports
│   ├── index.css           # Master design system & CSS custom variables
│   └── main.jsx            # Application entry point
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules for sensitive files & node_modules
├── package.json            # Project dependencies & scripts
├── README.md               # Project documentation
└── vite.config.js          # Vite configuration
```

---

## ⚙️ Installation & Local Setup

### 1. Prerequisites
Make sure you have **Node.js** (v18 or higher) installed on your machine.

### 2. Clone the Repository
```bash
git clone https://github.com/janvi2106/PlacementAI.git
cd PlacementAI
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Add your Firebase project configuration credentials into `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Build for Production

To generate an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🔒 Security & Privacy Note

The `.env` file containing sensitive API keys is excluded from version control via `.gitignore`. Always use `.env.example` as a template when sharing the codebase.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/janvi2106/PlacementAI/issues).

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
