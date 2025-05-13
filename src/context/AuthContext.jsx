import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '../appwrite/auth';

// Create the auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check current admin user on component mount
    useEffect(() => {
        const checkAdminUser = async () => {
            try {
                setLoading(true);
                const currentUser = await authService.getCurrentUser();
                
                if (currentUser) {
                    setUser(currentUser);
                    setIsAdmin(currentUser.isAdmin || false);
                } else {
                    setUser(null);
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error("Error checking admin authentication:", error);
                setUser(null);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminUser();
    }, []);    // Admin login function
    const login = async (email, password) => {
        try {
            await authService.login(email, password);
            const currentUser = await authService.getCurrentUser();
            
            if (currentUser && currentUser.isAdmin) {
                setUser(currentUser);
                setIsAdmin(true);
                return currentUser;
            }
            
            // If not admin, service will have already cleared the session,
            // but we'll update the state just in case
            setUser(null);
            setIsAdmin(false);
            throw new Error('Access Denied: This user is not authorized to access the admin panel.');
        } catch (error) {
            console.error("Admin login error:", error);
            // No need to call logout here as the auth service already handles session cleanup
            setUser(null);
            setIsAdmin(false);
            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setIsAdmin(false);
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    };    // Update password function
    const updatePassword = async (oldPassword, newPassword) => {
        try {
            return await authService.updatePassword(oldPassword, newPassword);
        } catch (error) {
            console.error("Update password error:", error);
            // No need to manually handle logout here as auth service already does it
            setUser(null);
            setIsAdmin(false);
            throw error;
        }
    };

    const value = {
        user,
        isAdmin,
        loading,
        login,
        logout,
        updatePassword
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
