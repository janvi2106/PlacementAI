# PlacementAI - Authentication Module Issues & Solutions

This document outlines all potential and resolved issues within the Authentication & Registration module (`src/modules/AuthModal.jsx`) along with their root causes and technical solutions.

---

## Table of Contents
1. [Issue 1: Email Already in Use (`auth/email-already-in-use`)](#issue-1-email-already-in-use-authemail-already-in-use)
2. [Issue 2: Infinite Loading on Firestore User Document Creation](#issue-2-infinite-loading-on-firestore-user-document-creation)
3. [Issue 3: Missing Password Confirmation Field](#issue-3-missing-password-confirmation-field)
4. [Issue 4: Weak Password Error Handling](#issue-4-weak-password-error-handling)
5. [Issue 5: Generic / Ambiguous Login Errors](#issue-5-generic--ambiguous-login-errors)
6. [Issue 6: Social Login Popup Blocked or Provider Unconfigured](#issue-6-social-login-popup-blocked-or-provider-unconfigured)
7. [Issue 7: Stale Error/State Across Tab Switches](#issue-7-stale-errorstate-across-tab-switches)

---

### Issue 1: Email Already in Use (`auth/email-already-in-use`)

- **Symptom**: When attempting to register with an existing email, Firebase Identity Toolkit API responds with an HTTP 400 status (`EMAIL_EXISTS`).
- **Root Cause**: Firebase Auth rejects account creation for emails that already exist in the database.
- **Solution**: 
  - Catch `auth/email-already-in-use` in the error handler.
  - Display a clear user message: `"An account with this email already exists."`
  - Provide an interactive button allowing the user to switch directly to the **Sign In** tab with one click.

---

### Issue 2: Infinite Loading on Firestore User Document Creation

- **Symptom**: The modal button gets stuck on **"Creating Account..."** indefinitely after clicking Register.
- **Root Cause**: `await setDoc(doc(db, 'users', user.uid), ...)` hangs if the Cloud Firestore database is uninitialized in Firebase Console, offline, or experiencing network latency. Because the promise never settles, `onClose()` and `setLoading(false)` are never reached.
- **Solution**:
  1. Use Firebase Auth's `updateProfile(user, { displayName })` to set the user's name immediately in Firebase Auth (independent of Firestore).
  2. Wrap `setDoc()` in a non-blocking `Promise.race` with a 2.5-second fallback timeout so Firestore delays do not block user sign-up.

---

### Issue 3: Missing Password Confirmation Field

- **Symptom**: Users could make typos when setting a password during registration without any confirmation step.
- **Root Cause**: The registration form only included a single password input field.
- **Solution**:
  1. Added a **Confirm Password** field to the registration form UI.
  2. Implemented real-time visual feedback (red border highlighting when passwords mismatch).
  3. Added client-side validation in `handleSubmit` to prevent API calls if `password !== confirmPassword`.

---

### Issue 4: Weak Password Error Handling

- **Symptom**: Entering short passwords (< 6 characters) causes registration failure with obscure error codes.
- **Root Cause**: Firebase Auth enforces a minimum 6-character limit for passwords.
- **Solution**:
  1. Integrated a live **Password Strength Meter** (Weak / Good / Strong) that updates as the user types.
  2. Mapped `auth/weak-password` to display: `"Password should be at least 6 characters."`

---

### Issue 5: Generic / Ambiguous Login Errors

- **Symptom**: Users receive raw Firebase error strings when entering invalid credentials.
- **Root Cause**: Default Firebase error messages contain internal code strings (`auth/invalid-credential`).
- **Solution**:
  Mapped Firebase Auth error codes to user-friendly messages:
  - `auth/invalid-credential` / `auth/wrong-password` -> `"Invalid email or password."`
  - `auth/user-not-found` -> `"No account found with this email."`

---

### Issue 6: Social Login Popup Blocked or Provider Unconfigured

- **Symptom**: Social authentication fails or hangs when clicking Google or Microsoft sign-in buttons.
- **Root Cause**: Microsoft OAuth provider is not yet enabled in Firebase Console, or browser popups are blocked.
- **Solution**:
  - Google Sign-In is wrapped in a `try/catch` with popup permission check.
  - Microsoft Sign-In displays an informative alert: `"Microsoft login is not configured yet."`

---

### Issue 7: Stale Error/State Across Tab Switches

- **Symptom**: Switching between **Sign In**, **Register**, and **Reset Password** tabs retains previous error messages or input states.
- **Root Cause**: Component state (`errorMessage`, `confirmPassword`) was not cleared when toggling `tab`.
- **Solution**: Added reset logic to clear `errorMessage`, `message`, and `confirmPassword` upon switching tabs.
