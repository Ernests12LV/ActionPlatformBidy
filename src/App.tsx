import React from 'react';
import Login from './components/Login';
import Registration from './components/Registration';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Login Page</h1>
            <Login />
            <h1>Register Page</h1>
            <Registration />
        </div>
    );
};

export default App;
