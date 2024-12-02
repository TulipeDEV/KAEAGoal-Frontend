import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [coinBalances, setCoinBalances] = useState({ KAEACoin: 0, THANKCoin: 0 });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          // Redirect to login page if no token is found
          navigate('/login');
          return;
        }

        // Fetch user data including coin balances
        const response = await axios.get('https://localhost:7001/api/User/user-data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
        if (response.data.coins) {
          // Assuming response.data.coins is an array of coin objects with coinType and balance
          const updatedCoinBalances = response.data.coins.reduce((acc, coin) => {
            acc[coin.coinType] = coin.balance;
            return acc;
          }, {});
          setCoinBalances(updatedCoinBalances); // Update state with fetched coin balances
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    // Clear token from localStorage and redirect to login page
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {userData ? (
        <div>
          <h3>Welcome, {userData.username}!</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      
      <div>
        <h4>Your Coin Balances:</h4>
        <ul>
          <li>KAEACoin (Gold): {coinBalances.KAEACoin}</li>
          <li>THANKCoin (Silver): {coinBalances.THANKCoin}</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
