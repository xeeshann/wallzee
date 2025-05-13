import { ID } from 'appwrite';
import { account } from './config';
import config from './config';

class AuthService {
    // Login: Authenticates and checks if the user is an admin by label
    async login(email, password) {
        let sessionJustCreated = false;
        try {
            // Authenticate the user with Appwrite.
            // If credentials are correct, a session is created for this user.
            const session = await account.createEmailPasswordSession(email, password);
            sessionJustCreated = true; // Mark that a session was successfully created

            // Verify if the authenticated user has the admin label.
            // The isAdmin() method will use the session established above.
            const isUserAnAdmin = await this.isAdmin();

            if (isUserAnAdmin) {
                // User is an admin. Login to the admin panel is successful.
                return session;
            } else {
                // User is authenticated but NOT an admin.
                // Deny access to the admin panel and destroy the session.
                await this.logout(); // Delete the session
                throw new Error('Access Denied: This user is not authorized to access the admin panel.');
            }
        } catch (error) {
            console.error("AuthService :: login :: error -", error.message);

            // If a session was created but the user wasn't an admin or another error occurred,
            // ensure the session is cleaned up. (this.logout() in the 'else' block handles the primary case)
            // This specific check is a fallback for unexpected errors post-session-creation.
            if (sessionJustCreated && error.message !== 'Access Denied: This user is not authorized to access the admin panel.') {
                try {
                    await account.deleteSession('current'); // Direct deletion
                } catch (cleanupError) {
                    console.error("AuthService :: login :: Error during session cleanup after failure:", cleanupError.message);
                }
            }
            throw error; // Allow the error to be handled by the calling UI
        }
    }    // Get current admin user
    async getCurrentUser() {
        try {
            const userAccount = await account.get();
            if (!userAccount) return null;
            
            // Check if user is admin
            const adminStatus = await this.isAdmin();
            
            // Add admin status to the user object
            userAccount.isAdmin = adminStatus;
            return userAccount;
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error.message);
            return null; // No authenticated user
        }
    }// Check if the currently authenticated user has the admin label
    async isAdmin() {
        try {
            // Get the details of the user associated with the current active session.
            // In the login flow, this is the user who just authenticated.
            const userAccount = await account.get();            // Get the admin label string from your configuration (e.g., 'admin', 'super-admin')
            // This label (e.g., 'admin') is what you would manually add to a user
            // in the Appwrite Console > Auth > Users > (select user) > Labels.
            const adminRoleLabel = config.adminLabelValue || 'admin'; // Default to 'admin' if not in config

            // Check if the user's 'labels' array (provided by Appwrite) contains the admin label.
            if (userAccount.labels && userAccount.labels.includes(adminRoleLabel)) {
                return true; // User has the admin label
            }
            return false; // User does not have the admin label
        } catch (error) {
            // This can happen if account.get() fails (e.g., network issue, or if somehow no session was active).
            // For safety, if we can't confirm admin status, assume they are not admin.
            console.error("AuthService :: isAdmin :: Could not verify admin status:", error.message);
            return false;
        }
    }

    // Update admin status for a user
    async updateAdminStatus(userId, isAdmin) {
        try {
            // This would typically update the user's preferences in Appwrite
            // This is a placeholder since we're using a mocked admin check
            return true;
        } catch (error) {
            console.error("AuthService :: updateAdminStatus :: error", error);
            throw error;
        }
    }    // Update admin password
    async updatePassword(oldPassword, newPassword) {
        try {
            return await account.updatePassword(newPassword, oldPassword);
        } catch (error) {
            console.error("AuthService :: updatePassword :: error", error.message);
            // No need to manually delete the session as Appwrite might handle this
            // depending on the error type
            throw error;
        }
    }// Logout admin
    async logout() {
        try {
            // Attempt to delete the current session.
            // Appwrite's deleteSession will succeed if a session exists,
            // may throw an error if no session exists (depending on SDK version/handling),
            // but the goal is to ensure no active session remains.
            await account.deleteSession('current');
            return true;
        } catch (error) {
            console.warn("AuthService :: logout :: Error deleting session (or no session to delete):", error.message);
            // Even if an error occurs (e.g., session already invalid/gone),
            // from the client's perspective, the user is effectively logged out.
            return true;
        }
    }
}

const authService = new AuthService();
export default authService;
