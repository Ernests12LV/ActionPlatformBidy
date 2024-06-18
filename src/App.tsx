import React from 'react';
import LandingPage from './components/Landingpage/landingpage';
import Login from './components/Login/login';
import Register from './components/Register/register';
import Home from './components/Home/home';
import './App.css';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <>
          <Routes>
            <Route path="/landingpage" element ={<LandingPage />} />
            <Route path="/login" element ={<Login />} />
            <Route path="/register" element ={<Register />} />
            <Route path="/home" element ={<Home />} />
          </Routes>  
        </>
    );
};

export default App;