
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/Layout/MainLayout';

// Pages
import GeneratorPage from './pages/Generator';
import TemplatesPage from './pages/Generator/Templates';
import VaultPage from './pages/Vault';
import VaultSettingsPage from './pages/Vault/Settings';
import ComparatorPage from './pages/Comparator';
import TerminalPage from './pages/Terminal';
import AuditPage from './pages/Audit';
import SecurityReportPage from './pages/Audit/SecurityReport';
import SandboxPage from './pages/Sandbox';
import DeploymentPage from './pages/Deployment';
import PipelinesPage from './pages/Deployment/Pipelines';
import ConsultantPage from './pages/Consultant';
import ChatPage from './pages/Chat';
import AnalysisPage from './pages/Analysis';
import VoicePage from './pages/Voice';
import ProfilePage from './pages/Profile';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize Theme
    const saved = localStorage.getItem('aa_user_profile');
    if (saved) {
      try {
        const { preferences } = JSON.parse(saved);
        const root = window.document.documentElement;
        root.classList.remove('dark');
        if (preferences.theme === 'dark' || (preferences.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          root.classList.add('dark');
        }
      } catch (e) {
        console.error('Failed to parse user profile', e);
      }
    }
  }, []);

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<GeneratorPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="vault" element={<VaultPage />} />
            <Route path="vault/settings" element={<VaultSettingsPage />} />
            <Route path="comparator" element={<ComparatorPage />} />
            <Route path="terminal" element={<TerminalPage />} />
            <Route path="audit" element={<AuditPage />} />
            <Route path="audit/security" element={<SecurityReportPage />} />
            <Route path="sandbox" element={<SandboxPage />} />
            <Route path="deployment" element={<DeploymentPage />} />
            <Route path="deployment/pipelines" element={<PipelinesPage />} />
            <Route path="consultant" element={<ConsultantPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="analysis" element={<AnalysisPage />} />
            <Route path="voice" element={<VoicePage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
