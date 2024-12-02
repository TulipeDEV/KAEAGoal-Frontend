import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RewardDetail = () => {
    const { id } = useParams();
    const [reward, setReward] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReward = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`https://localhost:7001/api/Reward/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReward(response.data);
            } catch (error) {
                console.error('Error fetching reward:', error);
                setMessage('Failed to load reward details.');
            }
        };

        fetchReward();
    }, [id, navigate]);

    const handleRedeem = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.post(`https://localhost:7001/api/Reward/redeem/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error redeeming reward:', error);
            setMessage(
                error.response?.data?.message || 'Failed to redeem reward. Try again.'
            );
        }
    };

    return (
        <div>
          <h2>Reward Details</h2>
          {message && <p style={{ color: 'blue' }}>{message}</p>}
          {reward ? (
            <div>
              <img
                src={reward.imageUrl}
                alt={reward.name}
                style={{ width: '200px', height: '200px' }}
              />
              <h3>{reward.name}</h3>
              <p>{reward.description}</p>
              <p>Cost: {reward.cost} KAEACoins</p>
              <button onClick={handleRedeem}>Redeem</button>
            </div>
          ) : (
            <p>Loading reward details...</p>
          )}
        </div>
      );
};

export default RewardDetail;