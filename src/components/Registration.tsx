// Registration.tsx
import React, { useState } from 'react';
import axios from '../axiosInstance';

const Registration: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/register', { email, password });
      console.log(res.data); // Handle response (e.g., show success message)
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        console.error(err.response.data); // Handle specific error (user already exists)
      } else {
        console.error('Error occurred:', err.message); // Handle other errors
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;
