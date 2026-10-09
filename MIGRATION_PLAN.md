# Migration Plan: Firebase to Supabase

## 1. Audit Report

I have thoroughly inspected the entire repository. Here are the findings:

### Firestore Read/Write & Usage
Currently, the **only** Firestore usage in the entire application is in `src/modules/AuthModal.jsx`. 
- `setDoc(doc(db, 'users', user.uid), {...})` is called after a successful email signup or Google login to store the user's basic profile.
- There are **no other reads or writes** anywhere in the code. No `getDocs`, `onSnapshot`, `addDoc`, etc. The rest of the app relies entirely on hardcoded React state and mock data.

### Firebase Storage Usage
There is **zero** Firebase Storage usage. The resume upload feature in `ATSAnalysisModule.jsx` uses the browser's native `FileReader` API to read local text; it does not upload files to Firebase Storage.

### Backend & Token Verification
There is currently **no Node/Express backend** in this repository. The app is purely a frontend React/Vite application. Therefore, no Firebase ID tokens are being verified server-side right now. 

### Grok / xAI Integration Points
There are **no actual API calls** to Grok, xAI, or Gemini in the code. Features like "AI Feedback" and "ATS Score" are currently returning hardcoded mockup responses from React state (e.g., in `HRInterviewModule.jsx` and `ATSAnalysisModule.jsx`).

### Environment Variables
The `.env` file contains standard `VITE_FIREBASE_*` config keys. 
- **Security**: The `.env` file is properly included in `.gitignore`, meaning no secrets are committed to the git repository.
- There are no backend secrets (like Firebase Admin keys or xAI keys) currently present.

---

## 2. Migration Plan

Since the application currently relies mostly on mock data, we will not only replace the single Firestore write but also build the foundational architecture you requested for the real application.

### A. Architecture Updates
1. **Frontend**: Keep React/Vite. Use `supabase-js` for all data interactions. Configure the Supabase client to automatically attach the Firebase ID token using the `accessToken` option.
2. **Backend**: Create a new `server/` directory for the Node.js/Express backend. This server will use the Firebase Admin SDK to verify tokens and handle the Grok (xAI) API calls securely.

### B. Collection -> Table Mapping
Since the Firestore schema currently only consists of the `users` collection, here is the new relational schema we will create in PostgreSQL (Supabase):

| Old Firestore | New Supabase Table | Notes |
|---|---|---|
| `users` | `profiles` | Stores `user_id` (Firebase UID), `full_name`, `email`, `photo_url`, `created_at`. |
| *(Mock Data)* | `resumes` | Stores resume metadata, JSON structures, and PDF paths. |
| *(Mock Data)* | `ats_results` | Stores ATS scores and keyword analysis tied to a specific `resume_id`. |
| *(Mock Data)* | `hr_interviews` | Stores AI feedback and scores for HR rounds. |
| *(Mock Data)* | `ai_usage` | For tracking tokens and rate-limiting Grok calls per user. |

### C. Files to Change / Create
1. **Supabase Schema (New)**: `supabase/migrations/0001_initial_schema.sql` (Creates tables, sets up RLS).
2. **Supabase Client (New)**: `src/lib/supabase.js` (Initializes Supabase client wrapping the Firebase Auth token).
3. **Frontend Modification**: `src/modules/AuthModal.jsx` (Replace the Firestore `setDoc` with a Supabase `upsert` into `profiles`).
4. **Backend Setup (New)**: `server/index.js`, `server/middleware/auth.js` (Firebase Admin verification), `server/routes/ai.js` (Grok integration).
5. **Environment Config**: Update `.env` (Frontend) and create `server/.env` (Backend).

---

### Waiting for Approval
As requested in Step 1, no code has been changed yet. Please review the audit findings and the migration plan above. 

**Let me know if you approve this plan**, and I will provide the step-by-step click instructions to configure Firebase Third-Party Auth in the Supabase Dashboard, followed by implementing the code!
