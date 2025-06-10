// History.js
import React from 'react';

const History = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <p>No transactions yet.</p>;
  }

  return (
    <div className="history-container">
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((txn, index) => (
          <li key={index}>
            <strong>{txn.type.toUpperCase()}</strong> — KES {txn.amount} on {new Date(txn.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
