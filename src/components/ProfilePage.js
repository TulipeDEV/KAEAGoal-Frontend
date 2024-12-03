import React, { useEffect, useState } from 'react';
import { getUserDetails, getUserCoins } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        displayName: '',
        profilePicture: '',
        KAEACoin: 0,
        THANKCoin: 0
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDetails = await getUserDetails();
                console.log("User Details:", userDetails); // Log user details response
    
                const userCoins = await getUserCoins();
                console.log("User Coins:", userCoins); // Log user coins response
    
                // Extract coin balances from the array
                const kaeacoin = userCoins.find(c => c.coinType === "KAEACoin")?.balance || 0;
                const thankcoin = userCoins.find(c => c.coinType === "THANKCoin")?.balance || 0;
    
                setUser({
                    ...userDetails,
                    KAEACoin: kaeacoin,
                    THANKCoin: thankcoin,
                });
    
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
                navigate('/login');
            }
        };
    
        fetchUserData();
    }, [navigate]);
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1>Profile Page</h1>
            <div className="profile-header">
                <img
                    src={user.profilePictureUrl || 'default-profile-pic.jpg'} // Use the correct key
                    alt="Profile"
                    className="profile-img"
                />
                <div className="profile-info">
                    <h2>{user.displayname || "N/A"}</h2>
                    <p><strong>First Name:</strong> {user.firstname || "N/A"}</p>
                    <p><strong>Last Name:</strong> {user.lastname || "N/A"}</p>
                    <p><strong>Coins:</strong></p>
                    <p><strong>KAEACoin:</strong> {user.KAEACoin || 0}</p>
                    <p><strong>THANKCoin:</strong> {user.THANKCoin || 0}</p>
                </div>
            </div>
            <button onClick={() => navigate('/profile/edit')}>Edit Profile</button>
        </div>
    );    
};

export default ProfilePage;
