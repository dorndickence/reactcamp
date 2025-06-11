// App.js
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import axios from 'axios';

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get('https://mpesa-pesa-prompt.onrender.com/dashboard');
      setBalance(res.data.balance);
      setTransactions(res.data.transactions);
    } catch (error) {
      console.error('Failed to load dashboard:', error.message);
    }
  };

  const handleTransaction = async ({ amount, type }) => {
    const url = `https://mpesa-pesa-prompt.onrender.com/${type}`;
    try {
      await axios.post(url, { amount, phoneNumber });
      fetchDashboard(); // Refresh balance and history
    } catch (error) {
      alert(`Transaction failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleLogin = (phone) => {
    setPhoneNumber(phone);
    fetchDashboard(); // Load balance and transactions after login
  };

  return (
    <div className="app-container">
      {!phoneNumber ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard
          phoneNumber={phoneNumber}
          balance={balance}
          transactions={transactions}
          onTransaction={handleTransaction}
        />
      )}
    </div>
  );
};

export default App;
