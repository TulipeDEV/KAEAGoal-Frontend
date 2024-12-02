import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [coinBalances, setCoinBalances] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      fetchUserData();
    }
  }, []);

  // Fetch the user's data including coin balances
  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://localhost:7001/api/User/user-coins', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      setUserData(response.data);  // Assuming response.data contains user information
      setCoinBalances(response.data.coins);  // Assuming response.data.coins contains coin balances
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  return (
    <UserContext.Provider value={{ userData, coinBalances }}>
      {children}
    </UserContext.Provider>
  );
};
