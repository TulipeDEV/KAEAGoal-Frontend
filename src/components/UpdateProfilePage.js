import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../services/userService";

const UpdateProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        displayname: "",
        profilePictureUrl: "",
    });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await getUserDetails();
                console.log("User Details:", userDetails);
                setUser(userDetails);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details:", error);
                navigate("/login");
            }
        };

        fetchUserDetails();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Payload:", user); // Debug payload

        setIsSubmitting(true); // Disable submit button while submitting
        try {
            await updateUserProfile(user);
            alert("Profile updated successfully!");
            setIsSubmitting(false); // Reset submitting state
            navigate("/ProfilePage"); // Redirect after success
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
            setIsSubmitting(false); // Reset submitting state on failure
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="update-profile-container">
            <h1>Update Profile</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={user.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={user.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Display Name:</label>
                    <input
                        type="text"
                        name="displayname"
                        value={user.displayname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Profile Picture URL:</label>
                    <input
                        type="text"
                        name="profilePictureUrl"
                        value={user.profilePictureUrl}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update"}
                </button>
            </form>
        </div>
    );
};

export default UpdateProfilePage;
