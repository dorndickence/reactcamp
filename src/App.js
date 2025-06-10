import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const handleLogin = (phone) => {
    setUser(phone);
    // Optionally fetch balance and history from backend
  };

  const handleTransaction = ({ amount, type }) => {
    const newBalance = type === 'deposit' ? balance + amount : balance - amount;
    if (newBalance < 0) return alert('Insufficient balance');

    setBalance(newBalance);
    const transaction = {
      date: new Date().toLocaleString(),
      amount,
      type
    };
    setTransactions([transaction, ...transactions]);

    // TODO: call backend to process transaction
  };

  return (
    <div className="app">
      {user ? (
        <Dashboard
          phoneNumber={user}
          balance={balance}
          transactions={transactions}
          onTransaction={handleTransaction}
        />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
