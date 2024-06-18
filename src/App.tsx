import React from 'react';
import Home from './components/pages/home';
import Login from './components/pages/login';
import Register from './components/pages/register';
import './App.css';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <>
          <Routes>
            <Route path="/home" element ={<Home />} />
            <Route path="/login" element ={<Login />} />
            <Route path="/register" element ={<Register />} />
          </Routes>  
        </>
    );
};

export default App;
