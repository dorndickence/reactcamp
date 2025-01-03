import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeout, setTimeoutState] = useState(false);

  const handleTransaction = async () => {
    setLoading(true);
    setError('');
    setTimeoutState(false);

    // Set a timeout for the request
    const timeoutId = setTimeout(() => {
      setLoading(false);
      setTimeoutState(true);
    }, 10000); // 10 seconds timeout

    try {
      const response = await axios.post('https://m-pesa-prompt.onrender.com/mpesa', {
        amount,
        phoneNumber,
        transactionType,
      });
      clearTimeout(timeoutId); // Clear the timeout on success
      console.log('Transaction Success:', response.data);
    } catch (error) {
      clearTimeout(timeoutId); // Clear the timeout on error
      setError('Transaction Failed: ' + (error.response?.data || 'Unknown error'));
      console.error('Transaction Failed:', error.response.data);
    } finally {
      setLoading(false); // Stop loading whether success or failure
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
      <button onClick={handleTransaction} disabled={loading}>
        {loading ? 'Processing...' : 'Submit'}
      </button>
      {loading && <p>Loading...</p>}
      {timeout && <p style={{ color: 'red' }}>Request timed out. Please try again.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;