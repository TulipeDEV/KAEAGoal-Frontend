import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import { UserProvider } from './context/UserContext';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import RewardList from './components/RewardList';
import RewardDetail from './components/RewardDetail';
import ProfilePage from './components/ProfilePage';
import UpdateProfilePage from './components/UpdateProfilePage';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
          path="/RewardList"
          element={
            <PrivateRoute>
              <RewardList />
            </PrivateRoute>
          }
          />
          <Route
          path="/reward/:id"
          element={
            <PrivateRoute>
              <RewardDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/ProfilePage"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <UpdateProfilePage />
            </PrivateRoute>
          }
        />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;