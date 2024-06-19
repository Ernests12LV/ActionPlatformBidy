import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './components/Home/Home';
import RegisterView from './components/Register/Register';
import LoginView from './components/Login/Login';
import LandingPageView from './components/Landingpage/LandingPage';
import DashBoard from './components/DashBoard/DashBoard';

const App: React.FC = () => {
    return (
            <Routes>
                <Route path="/" element={<LandingPageView />} />
                <Route path="/home" element={<HomeView />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/register" element={<RegisterView />} />
                <Route path="/login" element={<LoginView />} />
            </Routes>
    );
};

export default App;
