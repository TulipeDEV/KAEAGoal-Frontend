import React from "react";
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("jwtToken");

    if(!token) {
        return <Navigate to="/login" />;
    }

    const decodedToken = jwtDecode(token);
    const isTokenExpired = decodedToken.exp * 1000 < Date.now();

    if (isTokenExpired) {
        localStorage.removeItem("jwtToken");
        return <Navigate to="/login"/>;
    }

    return children;
};

export default PrivateRoute;