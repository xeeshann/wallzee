import { ID, Query } from 'appwrite';
import { databases, account } from './config';
import config from './config';

class UserService {
    // Get all users from the database collection
    async getAllUsers(queries = []) {
        try {
            const defaultQueries = [Query.orderDesc('$createdAt')];
            const response = await databases.listDocuments(
                config.databaseId,
                config.usersCollectionId,
                [...defaultQueries, ...queries]
            );
            return response.documents;
        } catch (error) {
            console.error("UserService :: getAllUsers :: error", error);
            throw error;
        }
    }

    // Get user by ID
    async getUser(id) {
        try {
            return await databases.getDocument(
                config.databaseId,
                config.usersCollectionId,
                id
            );
        } catch (error) {
            console.error("UserService :: getUser :: error", error);
            throw error;
        }
    }

    // Create or update user profile
    async createUserProfile(userId, name, email) {
        try {
            // Check if user already exists
            try {
                await this.getUser(userId);
                
                // If user exists, update their profile
                return await this.updateUserProfile(userId, { name, email });
            } catch (error) {
                // If user doesn't exist, create a new profile
                return await databases.createDocument(
                    config.databaseId,
                    config.usersCollectionId,
                    userId, // Use the Appwrite user ID as the document ID
                    {
                        name,
                        email,
                        createdAt: new Date().toISOString()
                    }
                );
            }
        } catch (error) {
            console.error("UserService :: createUserProfile :: error", error);
            throw error;
        }
    }

    // Update user profile
    async updateUserProfile(id, data) {
        try {
            return await databases.updateDocument(
                config.databaseId,
                config.usersCollectionId,
                id,
                data
            );
        } catch (error) {
            console.error("UserService :: updateUserProfile :: error", error);
            throw error;
        }
    }

    // Make user an admin
    async makeAdmin(userId) {
        try {
            // Only account with admin permissions can update user labels
            await account.updateLabels(userId, [`${config.adminLabelKey}:${config.adminLabelValue}`]);
            
            // Update user profile to reflect admin status
            await this.updateUserProfile(userId, {
                isAdmin: true
            });
            
            return true;
        } catch (error) {
            console.error("UserService :: makeAdmin :: error", error);
            throw error;
        }
    }

    // Remove admin privileges
    async removeAdmin(userId) {
        try {
            // Only account with admin permissions can update user labels
            await account.removeLabels(userId, [`${config.adminLabelKey}:${config.adminLabelValue}`]);
            
            // Update user profile to reflect admin status removal
            await this.updateUserProfile(userId, {
                isAdmin: false
            });
            
            return true;
        } catch (error) {
            console.error("UserService :: removeAdmin :: error", error);
            throw error;
        }
    }

    // Delete user
    async deleteUser(id) {
        try {
            return await databases.deleteDocument(
                config.databaseId,
                config.usersCollectionId,
                id
            );
        } catch (error) {
            console.error("UserService :: deleteUser :: error", error);
            throw error;
        }
    }

    // Get user stats
    async getUserStats() {
        try {
            const users = await this.getAllUsers();
            
            const totalUsers = users.length;
            const admins = users.filter(user => user.isAdmin).length;
            const recentUsers = users.filter(user => {
                const createdAt = new Date(user.createdAt);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return createdAt >= thirtyDaysAgo;
            }).length;
            
            return {
                totalUsers,
                admins,
                recentUsers
            };
        } catch (error) {
            console.error("UserService :: getUserStats :: error", error);
            throw error;
        }
    }
}

const userService = new UserService();
export default userService;
