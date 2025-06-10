import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [inputPhone, setInputPhone] = useState('');

  const handleLogin = () => {
    const fixedPhone = '254712345678'; // Your fixed phone number
    if (inputPhone === fixedPhone) {
      onLogin(inputPhone);
    } else {
      alert('Unauthorized phone number.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Enter your phone number"
        value={inputPhone}
        onChange={(e) => setInputPhone(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
