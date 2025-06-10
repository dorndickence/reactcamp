import React from 'react';
import TransactionForm from './TransactionForm';
import History from './History';

const Dashboard = ({ phoneNumber, balance, transactions, onTransaction }) => {
  return (
    <div className="dashboard-container">
      <h2>Welcome, {phoneNumber}</h2>
      <h3>Current Balance: KES {balance}</h3>

      <TransactionForm phoneNumber={phoneNumber} onTransaction={onTransaction} />
      <History transactions={transactions} />
    </div>
  );
};

export default Dashboard;
