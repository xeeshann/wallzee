import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false }) => {
    const { user, isAdmin, loading } = useAuth();

    // Show loading state if authentication is still being checked
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // If no user is authenticated, redirect to login
    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    // If route requires admin privileges but user is not admin
    if (adminOnly && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    // User is authenticated and has required privileges
    return <Outlet />;
};

export default ProtectedRoute;
