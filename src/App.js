import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";
const App = () => {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');

  const handleTransaction = async () => {
    try {
      const response = await axios.post('https://m-pesa-prompt.onrender.com/mpesa', {
       amount,
        phoneNumber,
        transactionType,
      });
      console.log('Transaction Success:', response.data);
    } catch (error) {
      console.error('Transaction Failed:', error.response.data);
    }
  };

  return (
    <div>
      <h2>M-PESA Transaction</h2>
      <input 
        type="text" 
        placeholder="Amount" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Phone Number" 
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)} 
      />
      <select onChange={(e) => setTransactionType(e.target.value)} value={transactionType}>
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdraw</option>
      </select>
      <button onClick={handleTransaction}>Submit</button>
    </div>
  );
};

export default App;