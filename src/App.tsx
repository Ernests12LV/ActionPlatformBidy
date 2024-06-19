// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import your i18n instance
import HomeView from './components/Home/Home';
import RegisterView from './components/Register/Register';
import LoginView from './components/Login/Login';
import LandingPageView from './components/Landingpage/LandingPage';
import DashBoard from './components/DashBoard/DashBoard';

const App: React.FC = () => {
  return (
      <I18nextProvider i18n={i18n}>
        <Routes>
          <Route path="/" element={<LandingPageView />} />
          <Route path="/home" element={<HomeView />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </I18nextProvider>
  );
};

export default App;
