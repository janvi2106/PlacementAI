import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AIAssistantModal from './components/AIAssistantModal';
import PWABanner from './components/PWABanner';

// Modules
import LandingPage from './modules/LandingPage';
import AuthModal from './modules/AuthModal';
import DashboardModule from './modules/DashboardModule';
import ResumeBuilderModule from './modules/ResumeBuilderModule';
import ATSAnalysisModule from './modules/ATSAnalysisModule';
import AptitudeModule from './modules/AptitudeModule';
import TechnicalModule from './modules/TechnicalModule';
import HRInterviewModule from './modules/HRInterviewModule';
import CompanyPrepModule from './modules/CompanyPrepModule';
import ProgressModule from './modules/ProgressModule';
import ProfileModule from './modules/ProfileModule';
import SettingsModule from './modules/SettingsModule';
import AnalyticsModule from './modules/AnalyticsModule';

import { INITIAL_USER_PROFILE } from './data/mockData';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light' | 'tech'
  const [collapsed, setCollapsed] = useState(false);

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(INITIAL_USER_PROFILE);

  // PWA Prompt
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Listen for Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserProfile(prev => ({
          ...prev,
          name: user.displayName || prev.name || 'Placement User',
          email: user.email || prev.email,
          uid: user.uid
        }));
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Theme application
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PWA Service Worker & Install Prompt Setup
  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW Registered:', reg.scope))
        .catch(err => console.log('SW Register Error:', err));
    }

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted PWA prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUserProfile(prev => ({
      ...prev,
      name: userData.name || prev.name,
      email: userData.email || prev.email
    }));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Sign out error", e);
    }
    setIsLoggedIn(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-main)' }}>
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        userProfile={userProfile}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Navbar 
          currentTab={activeTab}
          userProfile={userProfile}
          theme={theme}
          setTheme={setTheme}
          onOpenAuth={() => setIsAuthOpen(true)}
          isLoggedIn={isLoggedIn}
          onInstallPWA={handleInstallPWA}
          deferredPrompt={deferredPrompt}
          toggleSidebar={() => setCollapsed(!collapsed)}
        />

        {/* PWA Prompt Banner */}
        <PWABanner 
          deferredPrompt={deferredPrompt} 
          onInstallPWA={handleInstallPWA} 
        />

        <main style={{ flex: 1, padding: '24px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          {activeTab === 'landing' && (
            <LandingPage 
              onExplore={(tab) => setActiveTab(tab)} 
              onOpenAuth={() => setIsAuthOpen(true)} 
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardModule 
              userProfile={userProfile} 
              onNavigate={(tab) => setActiveTab(tab)} 
            />
          )}

          {activeTab === 'resume_builder' && (
            <ResumeBuilderModule />
          )}

          {activeTab === 'ats_checker' && (
            <ATSAnalysisModule 
              onNavigateToBuilder={() => setActiveTab('resume_builder')} 
            />
          )}

          {activeTab === 'aptitude' && (
            <AptitudeModule />
          )}

          {activeTab === 'technical' && (
            <TechnicalModule />
          )}

          {activeTab === 'hr_interview' && (
            <HRInterviewModule 
              userProfile={userProfile} 
            />
          )}

          {activeTab === 'company_prep' && (
            <CompanyPrepModule 
              onStartMock={(tab) => setActiveTab(tab)} 
            />
          )}

          {activeTab === 'progress' && (
            <ProgressModule 
              userProfile={userProfile} 
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsModule 
              userProfile={userProfile} 
            />
          )}

          {activeTab === 'profile' && (
            <ProfileModule 
              userProfile={userProfile} 
              onUpdateProfile={(updated) => setUserProfile(updated)} 
            />
          )}

          {activeTab === 'settings' && (
            <SettingsModule 
              userProfile={userProfile} 
              onUpdateProfile={(updated) => setUserProfile(updated)} 
              theme={theme}
              setTheme={setTheme}
            />
          )}
        </main>
      </div>

      {/* Floating AI Assistant Copilot */}
      <AIAssistantModal />

      {/* User Authentication Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />
    </div>
  );
}
