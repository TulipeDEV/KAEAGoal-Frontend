import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RewardList = () => {
    const [rewards, setRewards] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('https://localhost:7001/api/Reward/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRewards(response.data);
            } catch (error) {
                console.error('Error fetching rewards:', error);
                setMessage('Failed to load rewards.');
            }
        };

        fetchRewards();
    }, [navigate]);

    return (
        <div>
            <h2>Rewards</h2>
            {message && <p style={{ color: 'blue'}}>{message}</p>}
            <ul>
                {rewards.map((reward) => (
                    <li key={reward.id}>
                        <Link to={`/reward/${reward.id}`}>
                        <img
                            src={reward.imageUrl}
                            alt={reward.name}
                            style={{ width: '100px', heigt: '100px'}}
                        />
                        <h3>{reward.name}</h3>
                        <p>Cost: {reward.cost} KAEACoins</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RewardList;